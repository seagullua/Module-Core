var flash = require('express-flash');

exports.configureModules = function(app) {
    app.use(flash());
}