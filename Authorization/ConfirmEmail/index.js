var Urls = include('Core/Urls');
var Authorization = include('Core/Authorization');
var EMail = include('Core/EMail');
var EMailTemplates = include('Core/EMail/Templates');
var User = include('Core/User');
var Locale = include('Core/Locale');
var ME = include('Core/Authorization/ConfirmEmail');

/**
 * Generates only code for user email confirmation
 * @param user full User object from database
 */
function generateUserConfirmationCode(user) {
    return Authorization.encodePassword(user.email + "_confirm_" + user._id);
}

/**
 * Generates full link for email confirmation
 * @param user full User object from database
 */
function generateUserConfirmationLink(user) {
    var confirmation_link = Urls.urlEmail(Urls.getFullUrl(
        Urls.urlUserEmailConfirmationLink(
            user.email,
            generateUserConfirmationCode(user)
        )
    ));
    return confirmation_link;
}

/**
 * Sends email with confirmation letter
 * @param user full User object
 * @param callback
 */
function sendEmailConfirmationLetter(user, language, callback) {
    if (!user.is_email_confirmed) {
        var html = EMailTemplates.renderEmailTemplate(
            ME.view('email_template/html'),
            language,
            {
                confirmation: generateUserConfirmationLink(user)
            });

        EMail.sendEmail(
            html,
            Locale.__(language, "Core.Authorization.ConfirmEmail.subject"),
            user.email,
            language,
            function (err) {
                if (err) {
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

function confirmEmailPage(req, res) {
    function showPopUp(text) {
        req.flash('popup', text);
        res.redirect(Urls.urlMainPage());
    }

    var email = req.params.email;
    var confirmation = req.params.confirmation;

    User.db.findUserByEmail(email, function (err, user) {
        if (err) {
            showPopUp(req.__("Core.Authorization.ConfirmEmail.confirm_error"));
        } else {
            if (!user) {
                //User not found
                showPopUp(req.__("Core.Authorization.ConfirmEmail.confirm_error"));
            } else {

                var user_code = generateUserConfirmationCode(user);
                if (confirmation != user_code) {
                    showPopUp(req.__("Core.Authorization.ConfirmEmail.confirm_error"));
                } else {
                    User.db.setUserEmailConfirmed(user._id, function (err) {
                        if (err) {
                            showPopUp(req.__("Core.Authorization.ConfirmEmail.confirm_error"));
                        } else {
                            showPopUp(req.__("Core.Authorization.ConfirmEmail.confirm_success"));
                        }
                    });
                }
            }
        }
    });
}

exports.configureRouters = function (app) {
    app.get(Urls.urlUserEmailConfirmationLink(":email", ":confirmation"), confirmEmailPage);
};

exports.sendEmailConfirmationLetter = sendEmailConfirmationLetter;
