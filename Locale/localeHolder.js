var __module_locales = {};
var __supported_lang = {langs: []};
var _ = require('underscore');

/**
 * Sets the supported locales
 * @param locales
 */
function setLocales(locales) {
    __supported_lang.langs = locales;
}

/**
 * Return the supported locales
 * @returns {*}
 */
function getLocales() {
    return __supported_lang.langs;
}

/**
 * Adds locale cache to storage
 * @param module_name module locale arrived from
 * @param translation_cache cache
 */
exports.addModuleLocale = function(module_name, translation_cache) {
    __module_locales[module_name] = translation_cache;
};

/**
 * Returns list of modules who provided locale
 */
exports.getModulesWithLocale = function() {
    return Object.keys(__module_locales);
};

/**
 * Returns the list of tags in translation
 * @param module
 * @param language
 * @returns {Array}
 */
function getLocaleTags(module, language) {
    var cache = __module_locales[module];
    var map = {};
    map[language] = {};
    cache.exportLocale(map);

    return Object.keys(map[language]);
}

/**
 * Returns keys which are missing in translation
 * @param module_name
 */
exports.getMissingTranslation = function(module_name, language) {
    var missing = [];

    var current = getLocaleTags(module_name, language);

    var supported = getLocales();
    for(var i=0; i<supported.length; ++i) {
        var lang = supported[i];
        if(lang != language) {
            var language_supports = getLocaleTags(module_name, lang);
            var unsupported = _.difference(language_supports, current);
            missing = missing.concat(unsupported);
        }
    }

    return missing;
};

exports.setLocales = setLocales;
exports.getLocales = getLocales;