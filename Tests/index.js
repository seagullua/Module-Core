var __test_module = {};
var assert = require('assert');
var path = require('path');

/**
 * Registers file with test for given module
 * @param module_name name of the module
 * @param test_file full path to test file
 */
function addTest(module_name, test_file) {
    if(!(module_name in __test_module)) {
        __test_module[module_name] = [];
    }

    __test_module[module_name].push(test_file);
    //console.log(__test_module);
}
/**
 * Runs all registered test
 */
function runTests() {


    //Iterate over modules with tests
    for(var key in __test_module) {
        //console.error(key, __test_module);
        describe(key, function(){
            //Iterate over test files
            var files = __test_module[key];

            for(var i=0; i<files.length; ++i) {
                var file = files[i];
                var test_name = path.basename(file, '.js');

                //Run each file separately
                describe(test_name, function(){
                    require(file);
                });
            }
        });
    }
}

exports.addTest = addTest;
exports.runTests = runTests;