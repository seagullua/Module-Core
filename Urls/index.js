var __urls = {
    addUrl: function(name, func) {
        this[name] = func;
    },
    configureModules: function(app) {
        app.locals.urls = include('Core/Urls');
    }
};

module.exports = __urls;