/*
    Module gives access for config variable into all templates
 */
var Config = include('Core/Config');
exports.configureModules = function(app) {
    app.locals.config = Config;
}