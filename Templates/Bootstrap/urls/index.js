var ME = include('Core/Templates/Bootstrap');
var Config = include('Core/Config');
exports.urlBootstrapJS = function() {
    return Config.server.urlcontent + ME.js('bootstrap.dist.js');
};