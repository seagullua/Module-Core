/**
 * Created by nastia on 12.05.14.
 */
var UserSchema = include('Core/User').db.User.schema;
var mongoose = require('mongoose')
    ,Schema = mongoose.Schema;

UserSchema.add({
    name:       {type: String, trim: true},
    surname:    {type: String, trim: true},
    image:      {type: String},
    confirmedEmail: {type: Boolean}
});

module.exports = null;