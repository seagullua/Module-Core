var __module_locales = {};

/**
 * Adds locale cache to storage
 * @param module_name module locale arrived from
 * @param translation_cache cache
 */
exports.addModuleLocale = function(module_name, translation_cache) {
    __module_locales[module_name] = translation_cache;
}

/**
 * Returns list of modules who provided locale
 */
exports.getModulesWithLocale = function() {
    return Object.keys(__module_locales);
}

/**
 *
 * @param module_name
 */
exports.getMissingTranslation = function(module_name, language) {

}