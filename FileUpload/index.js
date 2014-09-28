/**
 * Created by Andriy Chaika on 13.06.14.
 */
var path = require('path');
var fse = require('fs-extra');
var ME = include('Core/FileUpload');
/**
 * Shows the field for file upload
 * @param req
 * @param res
 * @param field_name
 * @param button_title
 * @param file_formats
 * @returns {String}
 */
function showFileUpload(res, res_locals, field_name, button_title, file_formats) {
    res_locals.js(ME.js('filepicker.js'));
    return res.renderTemplate(
        ME.view('file_upload_field'),
        {
            chooseButton: button_title,
            fieldName: field_name,
            fileFormats: file_formats.join(', ')
        });
}

exports.configureModules = function(app){
    app.locals.showFileUpload = function(field_name, button_title, file_formats) {
        return showFileUpload(this.res, this, field_name, button_title, file_formats);
    }

    /**
     * Function checks upload. If error occures it returns text message with
     * error description and deletes uploaded file. If no error occures then returns file name
     * @param field_name
     * @param supported_formats
     * @param callback
     */
    app.request.checkUpload = function(field_name, supported_formats, callback) {
        var req = this;
        var res = this.res;

        //console.log("CHECK UPLOAD", req.files);

        if(field_name in req.files) {
            var file = req.files[field_name];
            var real_name = file.name;

            var extension = path.extname(real_name).toLowerCase();

            if(supported_formats.indexOf(extension) >= 0) {
                callback(null, file.path, file.name);
            } else {
                //Delete uploaded file
                fse.remove(file.path, function(){
                    callback(res.__('common.file_upload.wrong_format'));
                });
            }

        } else {
            callback(res.__('common.file_upload.upload_error'));
        }
    }
}