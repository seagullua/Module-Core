var View = include('System/Loaders/View');
var path = require('path');
var Render = include('Core/Templates/Render');
var Locale = include('Core/Locale');
var Less = include('System/Loaders/Less');
var juice = require('juice');

/**
 * Create function __ for given locale
 * @param language language to create locale
 * @returns {Function}
 */
function createTranslationFunction(language) {
    return function(phrase) {
        return Locale.__(language, phrase);
    }
}

var __cache = {};

/**
 * Function which renders given template for email
 * @param view ME.view(...) object of the pass with template
 * @param language language code of the letter language: en, de, uk...
 * @param params JSON of params which are passed to the template
 */
function renderEmailTemplate(view, language, params) {
    params.ME = view.module;
    params.__ = createTranslationFunction(language);

    //var path_to_folder = View.viewFileName(view);
    var html = Render.renderTemplateLocal({}, view, params);
    return html;
}




/**
 * Make css styles inline
 * @param html
 */
function embedMainCss(html) {
    var css = Less.getMainCss();

    return juice.inlineContent(html, css);
}

exports.renderEmailTemplate = renderEmailTemplate;
exports.embedMainCss = embedMainCss;

