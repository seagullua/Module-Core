var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var Config = include('Core/Config');
exports.configureModules = function(app) {
    app.use(session({
        secret: Config.session.secret,
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({
            db: Config.dbSettings.db,
            host: Config.dbSettings.host
        })}));
}