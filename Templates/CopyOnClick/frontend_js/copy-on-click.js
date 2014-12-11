/**
 * Created by Andriy on 11.12.2014.
 */
var _copy_on_click_items = [];
$(function(){


    $('.copy-on-click').each(function(index, item){
        var client = new ZeroClipboard(item);
        _copy_on_click_items.push(client);
    });
});