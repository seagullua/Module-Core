$(function(){
    $('.disable-price').click(function() {
        if (!$(this).is(':checked')) {
            document.getElementById("price_ua").disabled = false;
            $( this ).attr( 'checked', false );
            $( this ).attr( 'value', 'false' );
        }
    });
    $('.disable-price').click(function() {
        if ($(this).is(':checked')) {
            document.getElementById("price_ua").disabled = true;
            document.getElementById("price_ua").value = '';
            $( this ).attr( 'checked', true );
            $( this ).attr( 'value', 'true' );
            $( this ).parent().parent().parent().find('.validator-error').hide();
            $( this ).parent().parent().parent().find('.validator-error').removeClass('activeError');
        }
    });
});