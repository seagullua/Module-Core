var ejs = require('ejs');
var fs = require('fs');
var path = require('path');

var __cache = {};

/**
 * Returns the rendered piece of template
 * @param req
 * @param res
 * @param file
 * @param options
 * @returns {String}
 */
function renderTemplate(res, file, options) {
    var locals = res.locals;
    for(var k in locals) {
        options[k] = locals[k];
    }
    if(!(file in __cache)) {
        if(path.extname(file) != '.ejs') {
            file += '.ejs';
        }
        __cache[file] = fs.readFileSync(file, 'utf-8');
    }

    return ejs.render(__cache[file], options);
}

exports.renderTemplate = renderTemplate;