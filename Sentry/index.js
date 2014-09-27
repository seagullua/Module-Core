var Config = include('Core/Config');
var raven = require('raven');

exports.configureErrorHandlers = function(app) {
    app.use(raven.middleware.express(Config.sentry.url));
}

exports.configureModules = function() {
    if(Config.sentry.report_fatal) {
        raven.patchGlobal(Config.sentry.url);
    }
}