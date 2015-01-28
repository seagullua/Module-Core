var ME = include('Core/Authorization/Form');
var Urls = include('Core/Urls');
var pages = require('./pages');
var on_sign_in_action = function(req, res) {
    res.redirect('/');
};

exports.setOnSignInAction = function(action) {
    on_sign_in_action = action;
};

exports.getOnSignInAction = function() {
    return on_sign_in_action;
};

exports.configureRouters = function(app) {
    app.get(Urls.urlSignUp(),  pages.signUp.get);
    app.post(Urls.urlSignUp(), pages.signUp.post);

    app.get(Urls.urlSignIn(),  pages.signIn.get);
    app.post(Urls.urlSignIn(),  pages.signIn.post);

    app.get(Urls.urlSignOut(),   pages.signOut);
};