/**
 * Created by Andriy on 27.02.2015.
 */
var localeSwitch = require('./localeSwitch');

exports.configureModules = function(app) {
    app.use(localeSwitch.localeSwitchMiddleware);
};

exports.localeRedirectToLocalisedPage = localeSwitch.localeRedirectToLocalisedPage;