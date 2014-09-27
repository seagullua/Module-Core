exports.configureModules = function(app) {
    app.request.page = null;

    app.locals.pageMetaInit = function() {
        if(!this.req.page) {
            this.req.page = {
                title: '',
                description: '',
                keywords: ''
            };
        }
    }
    app.locals.pageTitle = function(title) {
        this.pageMetaInit();
        this.req.page.title = title;
    }

    app.locals.pageKeywords = function(keywords) {
        this.pageMetaInit();
        this.req.page.keywords = keywords;
    }

    app.locals.pageDescription = function(description) {
        this.pageMetaInit();
        this.req.page.description = description;
    }

    app.locals.getPage = function() {
        this.pageMetaInit();
        return this.req.page;
    }

}