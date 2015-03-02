var Auth = include('Core/Authorization');

module.exports = function(req, res) {
    req.logout();
    res.redirect(Auth.invalidateCache('/'));
};