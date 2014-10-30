var Config = include('Core/Config');
var __urls = {
    addUrl: function(name, func) {
        this[name] = func;
    },
    configureModules: function(app) {
        app.locals.urls = include('Core/Urls');
    },

    /**
     * Creates the full url from short
     * for example "/book/" -> "http://localhost/book/"
     * @param short_url
     */
    getFullUrl: function(short_url) {
        return Config.server.url + short_url;
    }
};

module.exports = __urls;