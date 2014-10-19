var ME = include('Core/Authorization/Form');
var signIn = require('./signIn');
function showForm(req, res, message) {
    ME.common.showForm(req, res, 'sign_up', message);
}


exports.post = function(req, res) {
    req.signUpUser(req.body.email, req.body.password, function(err, user){
        if(err) {
            return showForm(req, res, err.message);
        } else {
            signIn.post(req, res);
        }
    });
};

exports.get = function(req, res) {
    showForm(req, res, null);
};