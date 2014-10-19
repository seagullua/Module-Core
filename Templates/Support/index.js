exports.configureModules = function(app) {
    app.use(function(req, res, next){
        res.locals.res = res;
        res.locals.req = req;
        next();
    });
};