var Config = include('Core/Config');
exports.urlSignIn = function() {
    return Config.authorization.signInUrl;
};

exports.urlSignUp = function() {
    return Config.authorization.signUpUrl;
};

exports.urlSignOut = function() {
    return Config.authorization.signOutUrl;
};