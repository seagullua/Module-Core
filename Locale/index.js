var i18n = require("i18n");
var Config = include("Core/Config");
var localeHolder = require('./localeHolder');

exports.configureModules = function(app) {
    i18n.configure({
        locales: Config.locale.supported,
        defaultLocale: Config.locale.default
    });

    localeHolder.setLocales(Config.locale.supported);
    app.use(i18n.init);
};



exports.addModuleLocale = function(module_name, translation_cache) {
    localeHolder.addModuleLocale(module_name, translation_cache);
};

/**
 * Translation given to tag to language
 * @param language code of the language
 * @param tag tag to translate
 * @private
 */
exports.__ = function(language, tag) {
    return i18n.__({
        phrase: tag,
        locale: language
    });
};

/**
 * Reads the locale value from request object
 * @param req
 */
exports.getLocaleFromRequest = function(req) {
    var locale = Config.locale.default;
    if(req && 'getLocale' in req) {
        locale = req.getLocale();
    }
    return locale;
};