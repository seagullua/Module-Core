var View = include('System/Loaders/View');
var path = require('path');
var emailTemplates = require('email-templates');
var i18n = require('i18n');

/**
 * Create function __ for given locale
 * @param language language to create locale
 * @returns {Function}
 */
function createTranslationFunction(language) {
    return function(phrase) {
        return i18n.__({
            phrase: phrase,
            locale: language
        });
    }
}

var __cache = {};

/**
 * Function which renders given template for email
 * @param view ME.view(...) object of the pass with template
 * @param language language code of the letter language: en, de, uk...
 * @param params JSON of params which are passed to the template
 * @param callback callback with err and html code of the letter
 */
function renderEmailTemplate(view, language, params, callback) {
    var path_to_folder = View.viewFileName(view);

    function renderFromCache() {
        //Add system objects
        params.ME = view.module;
        params.__ = createTranslationFunction(language);

        //Render from cache
        var template = __cache[path_to_folder];

        //Render template
        template(path.basename(path_to_folder), params, function(err, html) {
            if (err) {
                console.log(err);
                return callback(err);
            } else {
                callback(null, html);
            }
        });
    }

    //If not in cache yet add it
    if(!(path_to_folder in __cache)) {
        emailTemplates(path.dirname(path_to_folder), function(err, template) {
            if (err) {
                console.log(err);
                return callback(err);
            } else {
                //add to cache
                __cache[path_to_folder] = template;
                renderFromCache();
            }
        });
    }
}

exports.renderEmailTemplate = renderEmailTemplate;

