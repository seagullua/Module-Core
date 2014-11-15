var renderTemplate = require('./renderTemplate');

var View = include('System/Loaders/View');

exports.configureModules = function(app) {
    app.response.renderTemplate = function(file, options) {
        return renderTemplate.renderTemplate(this.locals, View.viewFileName(file), options);
    };

    app.locals.renderTemplate = function(file, options) {
        return renderTemplate.renderTemplate(this, View.viewFileName(file), options);
    };
};

exports.renderTemplateLocal = function(locals, file, options) {
    return renderTemplate.renderTemplate(locals, View.viewFileName(file), options);
};