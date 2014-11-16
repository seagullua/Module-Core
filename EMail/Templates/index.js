var View = include('System/Loaders/View');
var path = require('path');
var emailTemplates = require('email-templates');

/**
 * Function which renders given template for email
 * @param view ME.view(...) object of the pass with template
 * @param language language code of the letter language: en, de, uk...
 * @param params JSON of params which are passed to the template
 * @param callback callback with err and html code of the letter
 */
function renderEmailTemplate(view, language, params, callback) {
    var path_to_folder = View.viewFileName(view);
    emailTemplates(path.dirname(path_to_folder), function(err, template) {
        if (err) {
            console.log(err);
            return callback(err);
        }

        params.ME = view.module;
        template(path.basename(path_to_folder), params, function(err, html) {
            if (err) {
                console.log(err);
                return callback(err);
            } else {
                callback(null, html);
            }
        });
    });
}

exports.renderEmailTemplate = renderEmailTemplate;

