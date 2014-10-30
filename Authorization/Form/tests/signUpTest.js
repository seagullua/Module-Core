var assert = require('assert');
var Urls = include('Core/Urls');
var UserService = include('Core/User').db;
var TestsFrontend = include('Core/Tests/Frontend');

/**
 * Opens sign up form
 * @returns {Function}
 */
function openSignUpForm() {
    return function(browser) {
        browser
            .goto(Urls.getFullUrl(Urls.urlSignUp()));
    }
}

/**
 * Puts login and password to signup form
 * @param email
 * @param password
 */
function fillInSignUpForm(email, password) {
    return function(browser) {
        browser
            .type('#email-big', email)
            .type('#password-big', password);
    }
}

/**
 * Presses submit in sign up form
 * @param email
 * @param password
 */
function submitSignUpForm() {
    return function(browser) {
        browser
            .click('#sign-up-button')
            .wait();
    }
}

describe('Sign Up New User', function(){
    this.timeout(15000);
    var email = Math.random() + "@gmail.com";
    var password = Math.random();


    it('Should Fill In Sign Up Form And Submit', function(next){

        var browser = TestsFrontend.createBrowser();

        browser
            .use(openSignUpForm())
            .use(fillInSignUpForm(email, password))
            .screenshot(TestsFrontend.getScreenShotPath(this))
            .use(submitSignUpForm())
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
            .use(openSignUpForm())
            .use(fillInSignUpForm(email, password))
            .use(submitSignUpForm())
            .screenshot(TestsFrontend.getScreenShotPath(this))
            .exists(".alert-danger", function(error_shown){
                assert(error_shown, "The error message should be shown");
            })
            .run(function(){
                next();
            });
    });
});