$(function(){
    $('tr.auto-click').on("click", function() {
        if($(this).attr('data-href') !== undefined){
            document.location = $(this).attr('data-href');
        }
    });
});
