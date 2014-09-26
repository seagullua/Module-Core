var Config = include('Core/Config');
exports.configureModules = function(app) {
    app.locals.__js = [];

    /**
     * Adds JS file to be included in the footer
     * @param file_url
     */
    app.locals.js = function(file_url) {
        this.__js.push(file_url);
    }

    /**
     * Returns list of file to include
     * @returns {string}
     */
    app.locals.jsList = function() {
        var result = '';
        var included = {};

        for(var i=0; i<this.__js.length; ++i) {
            var script = this.__js[i];

            if(!(script in included)) {
                included[script] = true;

                var url = this.url_content + script;
                result += '<script src="'+url+'"></script>\n';
            }
        }

        return result;
    }
}