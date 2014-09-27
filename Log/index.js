exports.configureModules = function(app) {
    var morgan = require('morgan');
    app.use(morgan('dev'));
}