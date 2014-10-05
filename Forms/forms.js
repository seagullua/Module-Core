/**
 * Created by Diana on 08.06.14.
 */
var fs = require('fs');


function getEJSFileName(field_type) {
    return 'views/common/forms/fields/'+field_type+'.ejs';
}

function getEJS(field_type) {
    return getEJSFileName(field_type);
}

function validateFieldValue(value, field) {
    return false;
}

function drawField(field, show_validation_errors, res,req) {

    var file = getEJS(field.type);
    return res.renderTemplate(file, {
        field: field,
        show_error: show_validation_errors,
    });
}

function generateForm(res, req, form_format_json, show_validation_errors) {
    var data = req.body;
    var formHTML = '';
    for(var i=0; i<form_format_json.length; ++i) {
        var field = form_format_json[i];

        var value = undefined;
        if(data[field.id] != undefined) {
            value = data[field.id];
        }

        field['value'] = value;

        var is_valid = true;
        if(show_validation_errors) {
            is_valid = validateFieldValue(value, field);
        }

        formHTML += drawField(field, !is_valid, res, req);
    }
    return formHTML;
}

/**
 * Creates HTML of the form
 * @param data
 * @param form_format_json
 */
function createForm(form_format_json) {
    var req = this;
    var res = this.res;
    return generateForm(res, req, form_format_json.fields, false);
}

/**
 * Creates HTML code of the form with errors after fields where validation failed
 * @param data
 * @param form_format_json
 */
function createFormAndValidate(form_format_json) {
    var req = this;
    var res = this.res;
    return generateForm(res, req, form_format_json.fields, true);
}

/**
 * Function validates given data and returns validated JSON or null if validation failed
 * @param data
 * @param form_format_json
 */
function validateForm(form_format_json) {
    //TODO: impelement
}

exports.validateForm = validateForm;

exports.createForm = createForm;
exports.createFormAndValidate = createFormAndValidate;