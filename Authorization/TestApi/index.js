var Urls = include('Core/Urls');

/**
 * Generates random user email and password
 * @returns {{email: string, password: string}}
 */
function randomUserCredentials() {
    var email = Math.random() + "@gmail.com";
    var password = Math.random()+"";
    return {
        email: email,
        password: password
    }
}


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
 * Opens sign in form
 * @returns {Function}
 */
function openSignInForm() {
    return function(browser) {
        browser
            .goto(Urls.getFullUrl(Urls.urlSignIn()));
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
 * Fill in sign form
 * @param email
 * @param password
 * @returns {*}
 */
function fillInSignInForm(email, password) {
    return fillInSignUpForm(email, password);
}

/**
 * Presses submit in sign up form
 */
function submitSignUpForm() {
    return function(browser) {
        browser
            .click('#sign-up-button')
            .wait();
    }
}

/**
 * Presses submit in sign in form
 */
function submitSignInForm() {
    return submitSignUpForm();
}

/**
 * Create new user account and signin in it
 */
function createNewUserAndSignIn() {
    var user = randomUserCredentials();

    return function(browser) {
        browser
            .use(openSignUpForm())
            .use(fillInSignUpForm(user.email, user.password))
            .use(submitSignUpForm());
    }
}

exports.randomUserCredentials = randomUserCredentials;
exports.openSignUpForm = openSignUpForm;
exports.openSignInForm = openSignInForm;
exports.fillInSignUpForm = fillInSignUpForm;
exports.fillInSignInForm = fillInSignInForm;
exports.submitSignUpForm = submitSignUpForm;
exports.submitSignInForm = submitSignInForm;
exports.createNewUserAndSignIn = createNewUserAndSignIn;