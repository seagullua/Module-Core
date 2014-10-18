var i18n = require("i18n");
var Config = include("Core/Config");


exports.configureModules = function(app) {
    i18n.configure({
        locales: Config.locale.supported,
        defaultLocale: Config.locale.default
    });

    app.use(i18n.init);
}

var localeHolder = require('./localeHolder');

exports.addModuleLocale = function(module_name, translation_cache) {
    localeHolder.addModuleLocale(module_name, translation_cache);
}