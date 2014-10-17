/**
 * Created by nastia on 18.05.14.
 */
require('./models/user.js');
var User = include('Core/User').db.User;
var crudService = require('./crud.js');





/**
 * @param email
 * @param value - Boolean - enum: [true, false]
 * @param callback
 */
function setConfirmedEmail(email, value, callback) {

    crudService.update(User(),
        {email : email},
        {confirmedEmail : value},
        callback);
}

function changeEmail(userId, newEmail, callback) {
    if (!crudService.validate('id', userId)) {
        callback(null, null);
        return;
    }

    crudService.updateOne(User(), {_id : userId},
        {email : newEmail,
            confirmedEmail : false
        }, {}, callback);
}

function changeName(userId, name, surname, callback){
    if (!crudService.validate('id', userId)) {
        callback(null, null);
        return;
    }

    crudService.updateOne(User(), {_id : userId},
        {name : name,
            surname: surname
        }, {}, callback);
}

function changePassword(userId, password, callback) {
    if (!crudService.validate('id', userId)) {
        callback(null, null);
        return;
    }

    crudService.updateOne(User(), {
        _id : userId
    }, {
        password : password
    }, {}, callback);
}

exports.setUserConfirmedEmail = setConfirmedEmail;
exports.changeUserEmail = changeEmail;
exports.changeUserName = changeName;
exports.changePassword = changePassword;