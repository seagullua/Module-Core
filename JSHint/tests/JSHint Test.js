var path = require('path');
var shelljs = require('shelljs');
var assert = require('assert');

var modules_root = path.join(__dirname, "../../../");

function failTest() {
    assert(false);
}

describe('JS Hint', function(){
    //--reporter node_modules/jshint-json/json.js
    var output = shelljs.exec('jshint  '+modules_root).output.trim();
	output = output.split('\n');


    var has_errors = false;

    for(var i = 0; i<output.length; ++i) {
        var data = output[i];
        if(data.trim()) {
            it(data.trim(), failTest);
            has_errors = true;
        }
    }

    it('JSHint check should pass', function(){
        assert(!has_errors);
    });

});
