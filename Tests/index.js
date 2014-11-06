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
 * Returns the function for testing signle file
 * @param file_name
 */
function testFile(file_name) {
    return function(){
        require(file_name);
    };
}

/**
 * Return function for tests in single module
 * @param files
 */
function testModule(files) {
    return function() {
        //Iterate over test files
        for(var i=0; i<files.length; ++i) {
            var file = files[i];

            //Only js file
            if(path.extname(file).toLowerCase() == ".js") {
                var test_name = path.basename(file, '.js');

                //Run each file separately
                describe(test_name, testFile(file));
            }
        }
    };
}

var test_list = null;

/**
 * Runs all registered test
 */
function runTests() {


    //Iterate over modules with tests
    for(var key in __test_module) {
        var execute_test = true;

        //If we have test list check if test is in the list
        if(test_list && test_list.indexOf(key) < 0) {
            execute_test = false;
        }
        //console.error(key, __test_module);
        if(execute_test) {
            describe(key, testModule(__test_module[key]));
        }
    }
}

function setTestList(list) {
    test_list = list;
}

exports.setTestList = setTestList;
exports.addTest = addTest;
exports.runTests = runTests;