var Config = include('Core/Config');
var express = require('express');
exports.configureModules = function(app) {
    app.request.__js = null;

    /**
     * Adds JS file to be included in the footer
     * @param file_url
     */
    app.locals.js = function(file_url, is_full) {

        if(!this.req.__js) {
            this.req.__js = [];
        }
        this.req.__js.push({
            file: file_url,
            is_full: is_full
        });
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
                var info = __js[i];
                var script = info.file;

                if(!(script in included)) {
                    included[script] = true;

                    var url;
                    if(!info.is_full) {
                        url = this.url_content + script;
                    } else {
                        url = script;
                    }
                    result += '<script src="'+url+'"></script>\n';
                }
            }
        }

        return result;
    };

};