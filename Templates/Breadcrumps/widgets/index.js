/**
 * Created by Andriy on 08.01.2015.
 */
var ME = include('Core/Templates/Breadcrumps');

exports.widgetShowBreadcrumps = function() {
    return {
        view: ME.view('breadcrumps'),
        options: {}
    };
};