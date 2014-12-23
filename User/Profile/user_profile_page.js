var Config = include('Core/Config');
var path = require('path');
var images = include('Core/Images');
var Auth = include('Core/Authorization');
var ME = include('Core/User/Profile');
var User = include('Core/User').db;
var Locale = include('Core/Locale');
var ConfirmEmail = include('Core/Authorization/ConfirmEmail');

function checkPermissions(req,res,next) {
    if(req.grantPermissions(['user'])) {
        next();
    }
}

function postUserProfile(req,res){
    if (req.user.email != req.body.email) {
        req.body.is_email_confirmed = false;
    }

    User.updateUserProfile(req.user._id, req.body, function(err) {
        if (err) {
            return res.showError(500);
        }
        res.redirect('/profile/');
    });
}
function getUserProfile(req, res) {
    res.render(ME.view('user_profile'),
        {
            userInfo: req.user
        }
    );
}

function resendConfirmation(req, res) {
    var locale = Locale.getLocaleFromRequest(req);

    ConfirmEmail.sendEmailConfirmationLetter(req.user, locale, function(err){
        if(err) {
            console.error("Letter not send",err);
        } else {
            console.log("Confirmation sent");
            res.redirect('/profile/');
        }

    });
}

function changePassword(req, res) {
    var newPassword = req.body.password;

    Auth.changeUserPassword(req.user._id, newPassword, function(err) {
        if (err) {
            console.error("Some problem with password change");
        } else {
            console.log("Password changed!");
            res.redirect('/profile/');
        }
    })
}

exports.changePassword = changePassword;
exports.resendConfirmation = resendConfirmation;
exports.getUserProfile = getUserProfile;
exports.postUserProfile = postUserProfile;
exports.checkPermissions = checkPermissions;