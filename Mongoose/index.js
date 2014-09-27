var __models = {};
var __schemes = {};

function getModel(name) {
    if(!(name in __models)) {
        __models[name] = {val: null};
    }
    return __models[name];
}

function getScheme(name) {
    if(!(name in __schemes)) {
        __schemes[name] = {val: null};
    }
    return __schemes[name];
}


global.model = function(package_name) {
    var model = getModel(package_name);
    return function() {
        return model.val;
    }
}

global.schema = function(package_name) {
    var scheme = getScheme(package_name);
    if(!scheme.val) {
        var scheme_module = include(package_name);
        scheme.val = scheme_module.scheme;
        if('modelName' in scheme_module) {
            scheme.name = scheme_module.modelName;
        } else {
            scheme.name = package_name;
        }
    }
    return scheme.val;
}

var mongoose = require('mongoose');
exports.configureBeforeLaunch = function() {
    for(var name in __schemes) {
        var schema = getScheme(name);
        var use_name = schema.name;
        var model = getModel(name);
        model.val = mongoose.model(use_name, schema.val);
    }
}