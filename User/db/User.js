var mongoose = require('mongoose')
    ,Schema = mongoose.Schema;


exports.name = 'User';
exports.schema = new Schema({
    email:      {type: String,  match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,  unique: true, required: true, index: true},
    password:   {type: String, required: true}
});