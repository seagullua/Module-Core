var ME = include('Core/User');
var User = ME.db.User;


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

function updateUserProfile(user_id, profile, callback) {
    ME.db.User().findOneAndUpdate({
        _id: user_id
    }, profile, callback);
}

exports.createUser = createUser;
exports.findUserById = findUserById;
exports.findUserByEmail = findUserByEmail;
exports.setUserEmailConfirmed = setUserEmailConfirmed;
exports.updateUserProfile = updateUserProfile;