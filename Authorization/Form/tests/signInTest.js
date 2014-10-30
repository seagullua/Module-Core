var assert = require('assert');
var TestsFrontend = include('Core/Tests/Frontend');

var TestApi = include('Core/Authorization/TestApi');
var Authorization = include('Core/Authorization');

describe('Sign In User', function(){
    this.timeout(25000);

    var user = TestApi.randomUserCredentials();
    var email = user.email;
    var password = user.password;

    before(function(next) {
        Authorization.signUpUser(email, password, next);
    });


    it('Should Fill In Sign In Form And Submit', function(next){

        var browser = TestsFrontend.createBrowser();

        browser
            .use(TestApi.openSignInForm())
            .use(TestApi.fillInSignInForm(email, password))
            .screenshot(TestsFrontend.getScreenShotPath(this))
            .use(TestApi.submitSignInForm())
            .run(function(err, browser) {

                assert(browser.getStatusCode() == 200, "Page should load successfully");

                next();
            });
    });

    /**
     * Check if the error is shown in given scenario
     * @param email
     * @param password
     */
    function checkSignInError(email, password, test, next) {
        var browser = TestsFrontend.createBrowser();
        browser
            .use(TestApi.openSignInForm())
            .use(TestApi.fillInSignInForm(email, password))
            .use(TestApi.submitSignInForm())
            .screenshot(TestsFrontend.getScreenShotPath(test))
            .exists(".alert-danger", function(error_shown){
                assert(error_shown, "The error message should be shown");
            })
            .run(function(){
                next();
            });
    }

    it('Should not allow to sign in with wrong password', function(next){
        checkSignInError(email, password+"wrong", this, next);
    });

    it('Should not allow to sign in with wrong email', function(next){
        checkSignInError(email+"wrong", password, this, next);
    });
});