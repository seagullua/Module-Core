var Urls = include('Core/Urls');
var AuthorizationForm = include('Core/Authorization/Form');
var Auth = include('Core/Authorization');

function performRedirect(req, res, redirect_to, redirect_back_to_url) {
    if(!redirect_back_to_url) {
        redirect_back_to_url = req.originalUrl;
    }

    req.session.signin_redirect = {
        url: redirect_back_to_url,
        time: Date.now()
    };
    res.redirect(redirect_to);
}

function signInAndRedirectBack(redirect_back_to_url) {
    var req = this;
    var res = this.res;

    var url = Urls.urlSignIn();
    performRedirect(req, res, url, redirect_back_to_url);
}

function signUpAndRedirectBack(redirect_back_to_url) {
    var req = this;
    var res = this.res;

    var url = Urls.urlSignUp();
    performRedirect(req, res, url, redirect_back_to_url);
}

function redirectBack(req, res){
    //var result = false;
    var url = '/';
    if('signin_redirect' in req.session)
    {
        var signin_redirect = req.session.signin_redirect;

        //If it was not too long ago
        if(Date.now() - signin_redirect.time < 120 * 1000)
        {
            url = signin_redirect.url;
        }

        req.session.signin_redirect = null;
        delete req.session.signin_redirect;
    }
    res.redirect(Auth.invalidateCache(url));
}

exports.configureModules = function(app) {
    AuthorizationForm.setOnSignInAction(redirectBack);
    app.request.signInAndRedirectBack = signInAndRedirectBack;
    app.request.signUpAndRedirectBack = signUpAndRedirectBack;
};