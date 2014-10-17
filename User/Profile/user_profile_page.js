var Config = include('Core/Config');
var path = require('path');
var images = include('Core/Images');
//var userService = require('./../database/user.js');


function postUserProfile(req,res){
    userService.changeUserName(req.user.id,req.body.name,req.body.surname,function(err){
        if (err) {
            return res.showError(500)
        }
        if(req.body.email){
            userService.changeUserEmail(req.user.id,req.body.email,function(err){
                if (err) {
                    return res.showError(500);
                }
                console.log('user updated');
                res.send(200,"email_changed");
            })  ;
        }else{
            console.log('user updated');
            res.send(200);
        }
    })
}
function getUserProfile(req, res,error_message) {
    if(req.grantPermissions(['edit_book'])) {
        userService.findUserById(req.user.id, function(err) {
            if (err) {
                return res.showError(500);
            }
            res.render('userProfile/user_profile',{
                fileFormats: Config.book.coverFormats,
                message: error_message
            });
        });
    };

};

function resendConfirmation(req, res) {
    if (req.user) {
        req.smtp.sendEmailConfirmationLink(req.user.email);
        res.redirect('/profile/?resent=true');
    }
    else
        res.showError(404);
}

function changePassword(req, res) {
    var newPassword = req.body.new_password_1;

    userService.changePassword(req.user._id, newPassword, function(err) {
        if (err) {
            return res.showError(500);
        }
        res.redirect('/profile/');
    });
}

function checkOldPassword(req, res) {
    console.log("In check old");
    res.send(req.user.password == req.body.old_password);
}

exports.checkOldPassword = checkOldPassword;
exports.changePassword = changePassword;
exports.resendConfirmation = resendConfirmation;
exports.getUserProfile = getUserProfile;
exports.postUserProfile = postUserProfile;