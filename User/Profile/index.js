var Urls = include('Core/Urls');
var userProfilePage = require('./user_profile_page');
exports.configureRouters = function(app) {
    app.get(Urls.urlMyProfile('/'),userProfilePage.getUserProfile);
    app.post(Urls.urlMyProfile('/'),userProfilePage.postUserProfile);
    app.get(Urls.urlMyProfile('/resend'), userProfilePage.resendConfirmation);
    app.post(Urls.urlMyProfile('/changePassword'), userProfilePage.changePassword);
    app.post(Urls.urlMyProfile('/checkOldPassword'), userProfilePage.checkOldPassword);
}