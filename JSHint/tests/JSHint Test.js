var path = require('path');
var shelljs = require('shelljs');
var assert = require('assert');

var modules_root = path.join(__dirname, "../../../");


describe('JS Hint', function(){
    //--reporter node_modules/jshint-json/json.js
    var output = shelljs.exec('jshint  '+modules_root).output.trim();
	output = output.split('\n');

    for(var i = 0; i<output.length; ++i) {
        var data = output[i];
        if(data.trim()) {
            it(data.trim(), function(){
                assert(false);
            })
        }
    }
});
