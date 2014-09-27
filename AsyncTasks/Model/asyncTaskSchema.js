var mongoose = require('mongoose')
    ,Schema = mongoose.Schema;


var contentSchema = new Schema({
    created: { type: Date, expires: 3600*48, default: Date.now },
    finished:{ type: Boolean, default: false},
    success: { type: Boolean, default: false},
    error:   { type: String }
});

module.exports = contentSchema;