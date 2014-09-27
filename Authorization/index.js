var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var UserService = service('Core/User');

var Config = include('Core/Config');
var crypto = require('crypto');

function passwordHash(password) {
    var shasum = crypto.createHash('sha1');
    var salt = Config.authorization.passwordSalt;
    shasum.update(salt + password + salt);
    return shasum.digest('hex');
}

function encodePassword(password) {
    return passwordHash(password);
}

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, done) {
        UserService.findUserByEmail(email, function (err, user) {

            if (!err && user) {
                var hash = encodePassword(password);
                if (hash === user.password) {
                    done(null, user);
                }
                else {
                    done(null, false, {message: 'auth.wrong_password'});
                }
            }
            else {
                done(null, false, { message: 'auth.wrong_email' });
            }

        });
    }));


passport.serializeUser(function (user, done) {
    done(null, user._id);
});


passport.deserializeUser(function (req, id, done) {
    UserService.findUserById(id, function (err, user) {
        done(null, user);
    });
});
exports.configureModules = function(app) {
    app.use(passport.initialize());
    app.use(passport.session());
}

exports.signUpUser = function(email, password, callback) {
    var password = encodePassword(password);
    UserService.createUser(email, password, callback);
}