/**
 * Created by Diana on 08.06.14.
 */
var fs = require('fs');
var ME = include('Core/Forms');

function getEJSFileName(field_type) {
    return ME.view('fields/'+field_type);
}

function getEJS(field_type) {
    return getEJSFileName(field_type);
}

function validateFieldValue(value, field) {
    return true;
}

function drawField(field, show_validation_errors) {
    var file = getEJS(field.type);
    return {
        view: file,
        options: {
            field: field,
            show_error: show_validation_errors
        }
    };
}

function generateForm(data, form_format_json, show_validation_errors) {
    var formData = [];
    for(var i=0; i<form_format_json.length; ++i) {
        var field = form_format_json[i];

        var value = null;
        if(data[field.id] !== undefined) {
            value = data[field.id];
        }

        var post_err = null;
        if(data[field.post_error] !== undefined) {
            post_err = data[field.post_error];
        }

        field.value = value;
        field.post_error_text = post_err;

        var is_valid = true;
        if(show_validation_errors) {
            is_valid = validateFieldValue(value, field);
        }

        if(value !== null)
            formData.push(drawField(field, !is_valid));
    }
    return formData;
}

/**
 * Creates HTML of the form
 *
 * @param form_format_json
 * @param data default field values from database or req.body
 */
function widgetShowForm(form_format_json, data) {
    //Create form data for form
    var form_data = generateForm(data, form_format_json.fields, false);

    form_format_json.confirm_button_text = form_format_json.fields[form_format_json.fields.length - 1].confirm_button_text;
    return {
        view: ME.view('form'),
        options: {
            formFieldsWidgets: form_data,
            formData: form_format_json,
            validatorJS: ME.js('validation.js')
        }
    };
}

/**
 * Validator which is not implemented
 * @param field
 * @param value
 * @returns {undefined}
 */
function notImplemented(field, body) {
    console.error("Validator not implemented: ", field.type);
    return body[field.id];
}

/**
 * Builds the list of contributors
 * @param field
 * @param body
 */
function validateContributors(field, body) {
    var contributors = [];
    var in_body = body[field.id];
    if(in_body && in_body.type) {
        for (var i = 0; i < in_body.type.length; ++i) {
            if (!in_body.name[i] && !in_body.surname[i]) {
                continue;
            }
            contributors.push({
                type: in_body.type[i],
                name: in_body.name[i],
                surname: in_body.surname[i]
            });
        }
    }
    return contributors;
}

function validatePrice(field, body) {
    var total = '';

    if (typeof body[field.id] != 'undefined') {
        var splitted = body[field.id].split(".", 2);

        if (typeof splitted[1] != 'undefined') {
            if (splitted[1].length === 1) {
                splitted[1] = splitted[1] + '0';
            }
        }

        var dollars = parseInt(splitted[0]);
        var cents = parseInt(splitted[1]);


        // if there were no cents in string
        if (isNaN(cents)) {
            cents = 0;
        }

        total = dollars*100 + cents;
    }

    return total;
}

//Each validator should return validated value or null if the validation failed
var validators = {
    "description": notImplemented,
    "isbn": notImplemented,
    "list": notImplemented,
    "list-checkbox": notImplemented,
    "list-contributors": validateContributors,
    "list-contributorsEnglish": validateContributors,
    "list-twoItem": notImplemented,
    "number": notImplemented,
    "price": validatePrice,
    "price-with-checkbox": validatePrice,
    "text": notImplemented,
    "password-with-confirm": notImplemented
};


/**
 * Function validates given values and returns only values that are valid
 * @param data
 * @param form_format_json
 * @param override_object the validated values will override value in this object (optional)
 */
function validateForm(form_format_json, body, override_object) {
    var result = {};
    override_object = override_object ? override_object : {};

    var fields = form_format_json.fields;
    for(var i = 0; i<fields.length; ++i) {
        var field = fields[i];
        var id = field.id;
        var value = validators[field.type](field, body);

        //If valid
        if(value !== null) {
            result[id] = value;
            override_object[id] = value;
        }
    }
    return result;
}

exports.validateForm = validateForm;
exports.widgetShowForm = widgetShowForm;