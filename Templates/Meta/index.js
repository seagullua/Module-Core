exports.configureModules = function(app) {
    app.request.page = {
        keywords: '',
        title: '',
        description: ''
    };

    app.use(function(req, res, next){
        res.locals.page = req.page;
        next();
    });
}