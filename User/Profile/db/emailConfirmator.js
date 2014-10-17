/**
 * Created by nastia on 16.06.14.
 */
var EmailConfirmator = require('./models/emailConfirmator.js');
var userService = require('./../../db/User.js');
var crudService = require('./crud.js');



/**
 * Creates token in the database for the specified email
 * @param email
 * @param callback
 */
function createToken(email, callback) {
    require('crypto').randomBytes(48, function(e, buf) {
        if (e) {
            callback(null, null);
            return;
        }
        var token = buf.toString('hex');
        var emailConfirmator = new EmailConfirmator({
            email : email,
            token : token
        });
        EmailConfirmator.remove({email : email}, function(e) {
            if (e) {
                callback(null, null);
                return;
            }
            crudService.create(EmailConfirmator, emailConfirmator, function(err, email) {
                callback(err, err?null:email.token);
            });
        });

    });
}

/**
 * Looks up specified token in the database,
 * if finds one - sets emailConfirmed to true for user with specified
 * email and deletes token from database
 * @param token
 * @param callback
 */
function confirmEmail(token, callback) {
    crudService.findOne(EmailConfirmator, {token : token}, null, function(err, emailConfirmation) {
        if (err) {
            return callback(err, null);
        }
        if (!emailConfirmation) {
            callback(null, null);
        } else {
            EmailConfirmator.remove({token : token}, function(e) {
                if (e) {
                    callback(e, null)
                } else {
                    userService.setUserConfirmedEmail(emailConfirmation.email, true, callback);
                }
            });
        }
    });
}

exports.createEmailConfirmationToken = createToken;
exports.confirmUserEmail = confirmEmail;