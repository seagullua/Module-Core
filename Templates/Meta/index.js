exports.configureModules = function(app) {
    app.request.page = null;

    function initPageMeta(req) {
        if(!req.page) {
            req.page = {
                title: '',
                description: '',
                keywords: ''
            };
        }
    }

    app.locals.pageMetaInit = function() {
        initPageMeta(this.req);
    };
    app.locals.pageTitle = function(title) {
        this.pageMetaInit();
        this.req.page.title = title;
    };

    app.locals.pageKeywords = function(keywords) {
        this.pageMetaInit();
        this.req.page.keywords = keywords;
    };

    app.locals.pageDescription = function(description) {
        this.pageMetaInit();
        this.req.page.description = description;
    };

    app.response.pageTitle = function(title) {
        initPageMeta(this);
        this.page.title = title;
    };

    app.locals.getPage = function() {
        this.pageMetaInit();
        return this.req.page;
    };

};