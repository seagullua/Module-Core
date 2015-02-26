/**
 * Created by Andriy on 07.06.14.
 */

var moment = require('moment');

function formatDate(locale, date) {
    var d = moment(date);
    d.locale(locale);
    return "<span class='date' title='"+d.format('LLL')+"'>"+d.fromNow()+"</span>";
}

exports.configureModules = function(app) {
    app.locals.formatDate = function(date) {
        return formatDate(this.getLocale(), date);
    };
};