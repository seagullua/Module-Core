var i18n = require("i18n");
var Config = include("Core/Config");
i18n.configure({
    locales: Config.locale.supported,
    defaultLocale: Config.locale.default
});

exports.configureModules = function(app) {
    app.use(i18n.init);
}