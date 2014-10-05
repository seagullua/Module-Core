var Config = include('Core/Config');
var upload_dir = require('path').join(Config.rootPath, 'storage/tmp');
require('fs-extra').ensureDirSync(upload_dir);

var multipart = require('connect-multiparty')({uploadDir: upload_dir, keepExtensions: true});
module.exports = multipart;