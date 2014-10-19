exports.configureModules = function(app) {
    var bodyParser = require('body-parser');
    app.use( bodyParser.json({limit: '2mb'}) );       // to support JSON-encoded bodies
    app.use( bodyParser.urlencoded({
        extended: true
    })); // to support URL-encoded bodies
};