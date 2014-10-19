var ME = include('Core/Templates/TableRowClick');

/**
 * To use table row click add class auto-click to tr in table and set data-href attribute
 */
exports.widgetEnableTableRowClick = function() {
    return {
        view: ME.view('table_row'),
        options: {}
    };
};