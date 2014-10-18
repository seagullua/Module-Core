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
}



exports.addModuleLocale = function(module_name, translation_cache) {
    localeHolder.addModuleLocale(module_name, translation_cache);
}