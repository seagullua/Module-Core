var ME = include('Core/User');
var User = ME.db.User;


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