/*
    Module gives access for config variable into all templates
 */
var Config = include('Core/Config');
var path = require('path');

exports.configureModules = function(app) {
    app.locals.config = Config;
    app.locals.url_server = Config.server.url;
    app.locals.url_content = Config.server.urlcontent;
};