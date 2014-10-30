var nightmare = require('nightmare');


/**
 * Creates Nightmare browser instance
 */
exports.createBrowser = function(options) {
    var browser = new nightmare(options);
    browser.viewport(800, 10);
    return browser;
}

var path = require('path');
var Config = include('Core/Config');
var fse = require('fs-extra');

/**
 * Traverses through the test to get it full name
 * @param test_object
 * @returns {string}
 */
function getTestPath(test_object) {
    var pathes = [];
    var test = test_object.test;

    while('parent' in test) {
        pathes.unshift(test.title);
        test = test.parent;
    }
    return pathes.join('/');
}

/**
 * Returns the path to store screenshot
 * @param test_object "this" from mocha test section
 * @param screen_id the name of the screen (when more then 1 screen is made in one section)
 * @returns {*}
 */
function getScreenShotPath(test_object, screen_id) {
    screen_id = screen_id ? "_" + screen_id : "";
    var file_dir = path.join(Config.rootPath , "tmp/tests_screens", getTestPath(test_object) + screen_id +".png");
    fse.ensureDirSync(path.dirname(file_dir));

    return file_dir;
}

exports.getScreenShotPath = getScreenShotPath;