/**
 * Created by Andriy Chaika on 12.01.2015.
 */
var Config = include('Core/Config');
var path = require('path');
var crypto = require('crypto');
var express = require('express');

/**
 * Reads the protection key from storage or uses default one
 * @returns {*}
 */
function getKey() {
    if(Config.file_storage && Config.file_storage.key) {
        return Config.file_storage.key;
    } else {
        return "wlMOHH5zjTYyIxtHnjW7lsVxrIkKJA3Y9YYmAzxl";
    }
}

/**
 * Gets the full path of storage
 */
function getFolder() {
    var storage = 'storage';

    if(Config.file_storage && Config.file_storage.file_storage) {
        storage = Config.file_storage.folder;
    }

    return path.join(Config.rootPath, storage);
}

var key = getKey();
var folder = getFolder();
var url = Config.file_storage.url;

function protectFilePath(subpath) {
    var file_name = path.basename(subpath);
    var dir_name = path.dirname(subpath);

    var hash = crypto.createHash('sha1');
    hash.update(dir_name + key);
    var key = hash.digest('hex');

    return dir_name + '/' + key + '/' + file_name;
}

/**
 * Returns the safe path of given file
 * @param subpath path inside storage
 */
exports.getFilePath = function(subpath) {
    return path.join(folder, protectFilePath(subpath));
};

exports.getDirectoryPath = function(subpath) {
    return path.join(folder, protectFilePath(subpath));
};

exports.getFileUrl = function(subpath) {
    return url + protectFilePath(subpath);
};

exports.getDirectoryUrl = function(subpath) {
    return url + protectFilePath(subpath);
};

exports.configureRouters = function(app) {
    if(Config.file_storage.mount) {
        app.use("/storage-www", express.static(folder));
    }
};