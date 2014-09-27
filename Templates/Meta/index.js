exports.configureModules = function(app) {
    app.locals.page = {
        keywords: '',
        title: '',
        description: ''
    };

    //DEPRECATED
    app.request.page = {};

    app.locals.pageTitle = function(title) {
        this.page.title = title;
    }

    app.locals.pageKeywords = function(keywords) {
        this.page.keywords = keywords;
    }

    app.locals.pageDescription = function(description) {
        this.page.description = description;
    }

//    app.use(function(req, res, next){
//        res.locals.page = req.page;
//        next();
//    });
}