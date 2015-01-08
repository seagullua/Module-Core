/**
 * Created by Andriy on 08.01.2015.
 */
var breadcrumbs = require('express-breadcrumbs');

exports.configureModules = function(app) {
    app.use(breadcrumbs.init());
};