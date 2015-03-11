/**
 * Created by Andriy Chaika on 11.03.2015.
 */
var Config = include('Core/Config');
exports.urlEmail = function(url) {
    if(!url) url = '';
    var email_prefix = Config.server.url;
    if(email_prefix.substr(0, 4) != "http") {
        email_prefix = "http:" + email_prefix;
    }
    return email_prefix + url;
};
exports.urlEmailStatic = function(url) {
    if(!url) url = '';
    var email_prefix = Config.server.urlcontent;
    if(email_prefix.substr(0, 4) != "http") {
        email_prefix = "http:" + email_prefix;
    }
    return email_prefix + url;
};
