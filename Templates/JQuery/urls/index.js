var ME = include('Core/Templates/JQuery');
var Config = include('Core/Config');
exports.urlJQueryJS = function() {
    return Config.server.urlcontent + ME.js('jquery.dist.js');
};