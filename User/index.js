var User = model('Core/User');
var mongoose = require('mongoose')
    ,Schema = mongoose.Schema;


exports.modelName = 'User';
exports.schema = new Schema({
    email:      {type: String,  match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,  unique: true, required: true, index: true},
    password:   {type: String, required: true}
});

function createUser(email, password, callback) {
    User().create({
            email:      email,
            password:   password
        },
    callback);
}

function findUserById(id, callback) {
    User().findOne({
        _id: id
    }, callback);
}

function findUserByEmail(email, callback) {
    User().findOne({
        email: email
    }, callback);
}

exports.createUser = createUser;
exports.findUserById = findUserById;
exports.findUserByEmail = findUserByEmail;