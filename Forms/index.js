/**
 * Created by Andriy on 05.10.14.
 */
var forms = require('./forms');
exports.configureModules = function(app) {
    app.request.createForm = forms.createForm;
}