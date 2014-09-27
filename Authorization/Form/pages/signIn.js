var ME = include('Core/Authorization/Form');

function showForm(req, res, message) {
    ME.common.showForm(req, res, 'sign_in', message);
}

exports.post = function(req, res) {
    req.signInUser(req.body.email, req.body.password, function(err, user){
        if(err) {
            showForm(req, res, err.message);
        } else {
            res.redirect('/');
        }
    });
}

exports.get = function(req, res) {
    showForm(req, res, null);
}