var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var contentSchema = new Schema({
    created: { type: Date, expires: 3600*48, default: Date.now },
    finished:{ type: Boolean, default: false},
    success: { type: Boolean, default: false},
    error:   { type: String }
});

exports.schema = contentSchema;
exports.name = 'AsyncTask';