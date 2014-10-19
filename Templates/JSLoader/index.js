var Config = include('Core/Config');
var express = require('express');
exports.configureModules = function(app) {
    app.request.__js = null;

    /**
     * Adds JS file to be included in the footer
     * @param file_url
     */
    app.locals.js = function(file_url) {

        if(!this.req.__js) {
            this.req.__js = [];
        }
        this.req.__js.push(file_url);
    };

    /**
     * Returns list of file to include
     * @returns {string}
     */
    app.locals.jsList = function() {
        var __js = this.req.__js;
        var result = '';
        var included = {};
        if(__js) {
            for(var i=0; i<__js.length; ++i) {
                var script = __js[i];

                if(!(script in included)) {
                    included[script] = true;

                    var url = this.url_content + script;
                    result += '<script src="'+url+'"></script>\n';
                }
            }
        }

        return result;
    };

};