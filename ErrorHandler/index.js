var express = require('express');
var res = express.response;
var req = express.request;

var ME = include('Core/ErrorHandler');
var Config = include('Core/Config');

res.showError = function(error_code, err) {
    if(Config.production) {
        err = undefined;
    }
    var __ = this.__;
    this.status(error_code).render(ME.view('error_page'), {
        error_code: error_code,
        err: err,
        __: __
    });
};
req.showError = function(error_code, err) {
    this.res.showError(error_code, err);
};

/**
 * Handles all not-found errors
 * @param req
 * @param res
 * @param next
 */
function notFoundErrorHandler(req, res, next)
{
    res.showError(404);
}

/**
 * Handles fatal errors
 * @param err
 * @param req
 * @param res
 * @param next
 */
function fatalErrorHandler(err, req, res, next)
{
    console.error(err.stack);
    if(res.showError) {
        res.showError(500, err);
    } else {
        res.send(500, err.stack);
    }

}
exports.configureErrorHandlers = function(app) {
    app.use(notFoundErrorHandler);
    app.use(fatalErrorHandler);
};