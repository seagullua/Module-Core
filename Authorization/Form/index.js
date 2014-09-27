var ME = include('Core/Authorization/Form');
var Urls = include('Core/Urls');

var on_sign_in_action = function(req, res) {
    res.redirect('/');
}

exports.setOnSignInAction = function(action) {
    on_sign_in_action = action;
}

exports.getOnSignInAction = function() {
    return on_sign_in_action;
}

exports.configureRouters = function(app) {
    app.get(Urls.urlSignUp(),  ME.pages.signUp.get);
    app.post(Urls.urlSignUp(), ME.pages.signUp.post);

    app.get(Urls.urlSignIn(),  ME.pages.signIn.get);
    app.post(Urls.urlSignIn(),  ME.pages.signIn.post);

    app.get(Urls.urlSignOut(),   ME.pages.signOut);
}