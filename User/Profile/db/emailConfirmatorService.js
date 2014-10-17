/**
 * Created by nastia on 16.06.14.
 */
var mongoose = require('mongoose')
    ,Schema = mongoose.Schema;

var emailConfirmatorSchema = new Schema({
    email : {type: String, unique: true},
    token : {type: String, unique: true}
});


module.exports = mongoose.model('EmailConfirmator', emailConfirmatorSchema);