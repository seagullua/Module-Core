var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema( {
    name: {type: String, default: ""},
    surname: {type: String, default: ""},
    email:      {type: String,  match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,  unique: true, required: true, index: true},
    password:   {type: String, required: true},
    publishing_house :    {type: String},
    phone_number:         {type: String},

    is_email_confirmed: {type: Boolean, default: false}
});

exports.schema = userSchema;
exports.name = "User";
