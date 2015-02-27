/**
 * Created by Andriy on 27.02.2015.
 */
var Config = include('Core/Config');
var languages = Config.locale.supported;
var url = require('url');

function localisedUrl(baseurl, language) {
    if(!language) {
        language = req.getLocale();
    }

    var origin = url.parse(baseurl, true);
    delete origin.search;
    origin.query.lang = language;
    return url.format(origin);
}

function getLocaleMetaAlternative() {
    var req = this.req;
    var tag = [];

    languages.forEach(function(lang){
        tag.push('<link rel="alternate" href="'+localisedUrl(req.originalUrl, lang)+'" hreflang="'+lang+'" />')
    });

    return tag.join('\n');
}

/**
 * If page has parameter ?lang=en then language will be switched to this locale
 * @param req
 * @param res
 * @param next
 */
function localeSwitchMiddleware(req, res, next) {
    if(req.query && req.query.lang) {
        req.setLocale(req.query.lang);
        req.session.locale = req.query.lang;
    } else if(req.session.locale) {
        req.setLocale(req.session.locale);
    }

    res.locals.getLocaleMetaAlternative = getLocaleMetaAlternative;
    res.locals.localeAppendLocaleToEachUrl = localeAppendLocaleToEachUrl;
    res.locals.localisedUrl = localisedUrl;
    next();
}

/**
 * Redirect user to page which hold his prefered locale
 * @param req
 * @param res
 * @param next
 */
function localeRedirectToLocalisedPage(req, res, next) {
    if(!req.query || !req.query.lang) {
        res.redirect(localisedUrl(req.originalUrl, req.getLocale()));
    } else {
        next();
    }
}

function localeAppendLocaleToEachUrl() {
    var lang = this.req.getLocale();

    var js = function(lang) {
        $(function() {
            $("a").attr('href', function(i, h) {
                if(!h) return h;
                if(h.indexOf('lang=') < 0) {
                    return h + (h.indexOf('?') != -1 ? "&lang="+lang : "?lang="+lang);
                }
                return h;
            });
        });
    };

    return '<script>(' + js.toString() + '("'+lang+'"));</script>';
}

exports.localeSwitchMiddleware = localeSwitchMiddleware;
exports.localeRedirectToLocalisedPage = localeRedirectToLocalisedPage;
exports.localeAppendLocaleToEachUrl = localeAppendLocaleToEachUrl;