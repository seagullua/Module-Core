var ME = include('Core/Authorization/Form');
var signIn = require('./signIn');
function showForm(req, res, message) {
    ME.common.showForm(req, res, 'sign_up', message);
}
var Config = include('Core/Config');

exports.post = function(req, res, next) {
    if(Config.signup) {
        req.signUpUser(req.body.email, req.body.password, function(err, user){
            if(err) {
                return showForm(req, res, err.message);
            } else {
                signIn.post(req, res);
            }
        });
    } else {
        next(new Error("sign up forbidden"));
    }

};

exports.get = function(req, res) {
    showForm(req, res, null);
};