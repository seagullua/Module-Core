exports.urlUserEmailConfirmationLink = function(email, confirmation_code) {
    return "/confirm-email/"+email+"/"+confirmation_code+"/";
}