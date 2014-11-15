var ME = include('Core/User');
//var User = ME.db.User;


function createUser(email, password, callback) {
    ME.db.User().create({
            email:      email,
            password:   password
        },
        callback);
}

function findUserById(id, callback) {
    ME.db.User().findOne({
        _id: id
    }, callback);
}

function findUserByEmail(email, callback) {
    ME.db.User().findOne({
        email: email
    }, callback);
}

function setUserEmailConfirmed(id, callback) {
    ME.db.User().findOneAndUpdate({
        _id: id
    }, {
        is_email_confirmed: true
    }, callback);
}

exports.createUser = createUser;
exports.findUserById = findUserById;
exports.findUserByEmail = findUserByEmail;
exports.setUserEmailConfirmed = setUserEmailConfirmed;