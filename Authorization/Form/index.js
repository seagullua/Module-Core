var ME = include('Core/Authorization/Form');
var Urls = include('Core/Urls');

exports.configureRouters = function(app) {
    app.get(Urls.urlSignUp(),  ME.pages.signUp.get);
    app.post(Urls.urlSignUp(), ME.pages.signUp.post);

    app.get(Urls.urlSignIn(),  ME.pages.signIn.get);
    app.post(Urls.urlSignIn(),  ME.pages.signIn.post);

    app.get(Urls.urlSignOut(),   ME.pages.signOut);
}