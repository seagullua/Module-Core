var renderTemplate = require('./renderTemplate');

var View = include('System/Loaders/View');

exports.configureModules = function(app) {
    app.response.renderTemplate = function(file, options) {
        return renderTemplate.renderTemplate(this, View.viewFileName(file), options);
    }
}