var assert = require('assert');
var UserService = include('Core/User').db;
var TestsFrontend = include('Core/Tests/Frontend');

var TestApi = include('Core/Authorization/TestApi');

describe('Sign Up New User', function(){
    this.timeout(25000);

    var user = TestApi.randomUserCredentials();
    var email = user.email;
    var password = user.password;


    it('Should Fill In Sign Up Form And Submit', function(next){

        var browser = TestsFrontend.createBrowser();

        browser
            .use(TestApi.openSignUpForm())
            .use(TestApi.fillInSignUpForm(email, password))
            .screenshot(TestsFrontend.getScreenShotPath(this))
            .use(TestApi.submitSignUpForm())
            .run(function(err, browser) {

                assert(browser.getStatusCode() == 200, "Page should load successfully");

                next();
            });
    });

    it('Should check that user exists', function(next){
        UserService.findUserByEmail(email, function(err, user){
            assert.ifError(err, "No database error");
            assert(user, "User should not be empty");
            next();
        });
    });

    it('Should not allow to sign up user with same email', function(next){
        var browser = TestsFrontend.createBrowser();
        browser
            .use(TestApi.openSignUpForm())
            .use(TestApi.fillInSignUpForm(email, password))
            .use(TestApi.submitSignUpForm())
            .screenshot(TestsFrontend.getScreenShotPath(this))
            .exists(".alert-danger", function(error_shown){
                assert(error_shown, "The error message should be shown");
            })
            .run(function(){
                next();
            });
    });
});