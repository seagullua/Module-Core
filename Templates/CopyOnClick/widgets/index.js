var ME = include('Core/Templates/CopyOnClick');

/**
 * To use table row click add class auto-click to tr in table and set data-href attribute
 */
exports.widgetEnableCopyOnClick = function() {
    return {
        view: ME.view('copy-on-click'),
        options: {}
    };
};