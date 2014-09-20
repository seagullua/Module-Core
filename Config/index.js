global.__config_store = {
    loadConfig: loadConfig
};
var config = __config_store;
var fs = require('fs');
var override = require('json-override');


function loadConfig(file){
    if(fs.existsSync(file)) {
        var json = require(file);
        override(this, json, false);
    }
}

module.exports = config;