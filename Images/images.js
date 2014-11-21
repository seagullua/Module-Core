var path = require('path');
var fse = require('fs-extra');
var gm = require('gm').subClass({ imageMagick: true });
var SUPPORTED_FORMATS = [".jpg", ".gif", ".png", ".jpeg"];

/**
 * Returns the name of scaled image
 * @param image_name
 * @param size
 * @returns {string} in format: _SIZE_ORIGINALNAME
 */
function getSmallImageName(image_name, size) {
    if(!size || size === 0) {
        return image_name;
    }
    return "_"+size+"_"+image_name;
}

/**
 * Returns the path to the scaled image
 * @param big_image
 * @param size
 * @returns {*}
 */
function getSmallImagePath(big_image, size) {
    var save_directory = path.dirname(big_image);
    var save_file_name = path.basename(big_image);
    return path.join(save_directory, getSmallImageName(save_file_name, size));
}


/**
 * Scales given image to the be not bigger then target_max_size.
 * If the image is smaller it is saved without changes
 * @param source_file
 * @param destination_file_name
 * @param original_size
 * @param target_max_size 0 means default size
 * @param callback
 */
function createOneSmallImage(source_file, destination_file_name, original_size, target_max_size, callback) {
    var w = original_size.width;
    var h = original_size.height;

    //we pass error if failed. And destination file name on success
    var callbackFunction = function(err){
        if(err) {
            callback(err);
        } else {
            callback(null, destination_file_name);
        }
    };

    if((w < target_max_size && h < target_max_size) || target_max_size === 0) {
        //The scale is not required just copy
        fse.copy(source_file, destination_file_name, callbackFunction);
    } else {
        //Scale the image
        gm(source_file)
            .resize(target_max_size, target_max_size)
            .quality(90)
            .write(destination_file_name, callbackFunction);
    }
}

function moveAndReplace(source_file, destination_file_name, callback) {
    function doMove() {
        fse.move(source_file, destination_file_name, function(err){
            callback(err);
        });
    }
    fse.exists(destination_file_name, function(exists){
        if(!exists) {
            doMove();
        } else {
            fse.delete(destination_file_name, function(){
                doMove();
            });
        }
    });
}

/**
 * Save the image with given name and creates resized copies
 * @param source_file
 * @param destination_file_name were to store image if the dir do not exists it will be created
 * @param sizes array of sizes of the image
 * @param callback returns list of images produced or error
 */
function saveImage(source_file, destination_file_name, sizes_in, callback) {
    var result_path = [];
    var sizes = [];
    for(var i =0; i<sizes_in.length; ++i) {
        sizes.push(sizes_in[i]);
    }

    //Error handler to path the error and list of files
    var handleErr = function(err) {
        if(err) {
            console.error("Image processing error: ",err);
        }
        callback(err, result_path);
    };

    //Final step moves source file
    function moveSourceFile() {
        moveAndReplace(source_file, destination_file_name, function(err){
            result_path.push(destination_file_name);
            handleErr(err);
        });
    }

    var output_dir = path.dirname(destination_file_name);
    fse.ensureDir(output_dir, function(err){
        if(err) {
            return handleErr(err);
        }

        //Get file size
        gm(source_file).size(function(err, original_size){
            if(err) {
                return handleErr(err);
            }

            //Callback function to recursively process all sizes array
            function processOne(err, last_image) {
                if(err) {
                    return handleErr(err);
                }

                //Ignore if empty
                if(last_image) {
                    result_path.push(last_image);
                }

                //Nothing to process
                if(!sizes || sizes.length === 0) {
                    moveSourceFile();
                } else {
                    //Process next file
                    var next_size = sizes.pop();
                    var next_path = getSmallImagePath(destination_file_name, next_size);

                    createOneSmallImage(source_file, next_path, original_size, next_size, processOne);
                }
            }

            //Start processing
            processOne();
        });
    });
}

/**
 * Get the size of the image
 * @param file
 * @param callback
 */
function getImageSize(file, callback) {
    gm(file).size(callback);
}

function createImageThumbnail(source_file, destination_file_name, thumbnail_size, callback) {
    var output_dir = path.dirname(destination_file_name);
    fse.ensureDir(output_dir, function(err){
        if(err) {
            return callback(err);
        }

        //Get file size
        gm(source_file).size(function(err, original_size){
            if(err) {
                return callback(err);
            }

            createOneSmallImage(source_file, destination_file_name, original_size, thumbnail_size, callback)
        });
    });
}

exports.getSmallImageName = getSmallImageName;
exports.getSmallImagePath = getSmallImagePath;
exports.saveImage = saveImage;
exports.getImageSize = getImageSize;
exports.createImageThumbnail = createImageThumbnail;
exports.SUPPORTED_FORMATS = SUPPORTED_FORMATS;
