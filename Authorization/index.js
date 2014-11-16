var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var UserService = include('Core/User').db;
var ConfirmEmail = include('Core/Authorization/ConfirmEmail');
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


function signUpUser(email, password_plain, callback) {
    var password = encodePassword(password_plain);
    var req = this;

    function onError(err) {
        console.error(err);
        callback({message: 'auth.internal_error'});
    }

    UserService.findUserByEmail(email, function(err, user){
        if(err) {
            return onError(err);
        }

        if(user) {
            callback({message: 'auth.user_exists'});
        } else {
            UserService.createUser(email, password, function(err, user){
                if(err) {
                    return onError(err);
                }

                //Do not wait while letter is sent
                callback(null, user);

                //Send letter to confirm
                ConfirmEmail.sendEmailConfirmationLetter(user, req.getLocale(), function(err){
                    if(err) {
                        console.error("Letter not send",err);
                    } else {
                        console.log("Confirmation sent");
                    }

                });

            });
        }
    });
}

function signInUser(email, password, callback) {
    var req = this;
    var res = this.res;

    function onError(err) {
        console.error(err);
        callback({message: 'auth.internal_error'});
    }

    req.body.email = email;
    req.body.password = password;

    passport.authenticate('local',
        function (err, user, info) {
            if (err) {
                return onError(err);
            }
            else {
                if (user) {
                    req.logIn(user, function (err) {
                        if (err) {
                            return onError(err);
                        }
                        callback(null, user);
                    });
                }
                else {
                    return callback(info);
                }
            }
        }
    )(req, res);
}

exports.signUpUser = signUpUser;
exports.encodePassword = encodePassword;

exports.configureModules = function(app) {
    app.request.signInUser = signInUser;
    app.request.signUpUser = signUpUser;
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(function(req, res, next){
        res.locals.user = req.user;
        next();
    });
};

