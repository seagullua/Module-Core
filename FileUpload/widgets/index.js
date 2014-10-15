var ME = include('Core/FileUpload');
/**
 * Shows the field for file upload
 * @param field_name
 * @param button_title
 * @param file_formats
 * @returns {String}
 */
function widgetShowFileUpload(field_name, button_title, file_formats) {
    return {
        view: ME.view('file_upload_field'),
        options: {
            chooseButton: button_title,
            fieldName: field_name,
            fileFormats: file_formats.join(', '),
            jsFile: ME.js('filepicker.js')
        }
    };
}

exports.widgetShowFileUpload = widgetShowFileUpload;