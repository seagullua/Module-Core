var ME = include('Core/Authorization/Form');


function showForm(req, res, form_name, message) {
    var email = req.body.email;
    var password = req.body.password;
    if(!email) {
        email = '';
    }
    if(!password) {
        password = '';
    }
    res.render(ME.view(form_name), {
        email: email,
        password: password,
        message: message
    });
}

module.exports = showForm;