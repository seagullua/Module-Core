var Urls = include('Core/Urls');
var Authorization = include('Core/Authorization');
var EMail = include('Core/EMail');

/**
 * Generates only code for user email confirmation
 * @param user full User object from database
 */
function generateUserConfirmationCode(user) {
    return Authorization.encodePassword(user.email+"_confirm_"+user._id);
}

/**
 * Generates full link for email confirmation
 * @param user full User object from database
 */
function generateUserConfirmationLink(user) {
    var confirmation_link = Urls.getFullUrl(
        Urls.urlUserEmailConfirmationLink(
            user.email,
            generateUserConfirmationCode(user)
        )
    );
    return confirmation_link;
}

/**
 * Sends email with confirmation letter
 * @param user full User object
 * @param callback
 */
function sendEmailConfirmationLetter(user, callback) {
    if(!user.is_email_confirmed) {
        EMail.sendEmail(
            "<b>Confirm Email: </b> "+generateUserConfirmationLink(user),
            "Confirm email",
            user.email,
            function(err){
                if(err) {
                    console.error(err);
                    callback(new Error("Core.Authorization.ConfirmEmail.send_error"));
                } else {
                    callback(null);
                }
        });
    } else {
        callback(new Error("Core.Authorization.ConfirmEmail.already_confirmed"));
    }
}

exports.sendEmailConfirmationLetter = sendEmailConfirmationLetter;
