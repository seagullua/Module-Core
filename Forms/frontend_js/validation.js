function FormValidator(options) {
    var _on_save = [];

    function isbnValidator(field) {
        var parent = $('#'+field.id+'-parent');
        var input = $('#'+field.id);

        function isTrueISBN(value) {
            if (value === '') {
                return true;
            }

            // http://en.wikipedia.org/wiki/International_Standard_Book_Number#Overview
            // Groups are separated by a hyphen or a space
            var type;
            switch (true) {
                case /^\d{9}[\dX]$/.test(value):
                case (value.length == 13 && /^(\d+)-(\d+)-(\d+)-([\dX])$/.test(value)):
                case (value.length == 13 && /^(\d+)\s(\d+)\s(\d+)\s([\dX])$/.test(value)):
                    type = 'ISBN10';
                    break;
                case /^(978|979)\d{9}[\dX]$/.test(value):
                case (value.length == 17 && /^(978|979)-(\d+)-(\d+)-(\d+)-([\dX])$/.test(value)):
                case (value.length == 17 && /^(978|979)\s(\d+)\s(\d+)\s(\d+)\s([\dX])$/.test(value)):
                    type = 'ISBN13';
                    break;
                default:
                    return false;
            }

            // Replace all special characters except digits and X
            value = value.replace(/[^0-9X]/gi, '');
            var chars  = value.split(''),
                length = chars.length,
                sum    = 0,
                checksum;
            var i;
            switch (type) {
                case 'ISBN10':
                    sum = 0;
                    for (i = 0; i < length - 1; i++) {
                        sum += ((10 - i) * parseInt(chars[i]));
                    }
                    checksum = 11 - (sum % 11);
                    if (checksum == 11) {
                        checksum = 0;
                    } else if (checksum == 10) {
                        checksum = 'X';
                    }
                    return (checksum + '' == chars[length - 1]);

                case 'ISBN13':
                    sum = 0;
                    for (i = 0; i < length - 1; i++) {
                        sum += ((i % 2 === 0) ? parseInt(chars[i]) : (parseInt(chars[i]) * 3));
                    }
                    checksum = 10 - (sum % 10);
                    if (checksum == 10) {
                        checksum = '0';
                    }
                    return (checksum + '' == chars[length - 1]);

                default:
                    return false;
            }
        }

        function revalidate(scroll) {
            parent.find('.validator-error').hide();
            var valid = true;

            if (!isTrueISBN(input.val())) {
                valid = false;
                var error = parent.find('.bad-isbn');
                error.show();
            }

            //console.log("Valid: ", valid);
            return valid;
        }

        input.on('input', revalidate);

        _on_save.push(function(){
            return revalidate(true);
        });

    }

    function numValidator(field) {
        var parent = $('#'+field.id+'-parent');
        var input = $('#'+field.id);

        function revalidate(scroll) {
            parent.find('.validator-error').hide();
            parent.find('.validator-error').removeClass('activeError');
            var valid = true;

            var error;

            if (field.id == "numOfPrintedPages") {
                // check if it is a number really
                for (var i = 0; i < input.val().length ; i++) {
                    if ((input.val().charAt(i) < '0') || (input.val().charAt(i) > '9')) {
                        valid = false;
                        error = parent.find('.not-number');
                        //parent.find('.not-number').removeClass('activeError');
                        error.show();
                        error.addClass('activeError');
                    }
                }
                if (input.val() < 0) {
                    valid = false;
                    error = parent.find('.negative-number');
                    error.show();
                    error.addClass('activeError');
                }
                if (input.val() % 2 !== 0) {
                    valid = false;
                    error = parent.find('.not-even');
                    error.show();
                    error.addClass('activeError');
                }
            }

            if (field.id == "numberInSeries") {
                // check if it is a number really
                for (var i = 0; i < input.val().length ; i++) {
                    if ((input.val().charAt(i) < '0') || (input.val().charAt(i) > '9')) {
                        valid = false;
                        error = parent.find('.not-number');
                        error.show();
                        error.addClass('activeError');
                    }
                }
                if (input.val() < 0 || input.val() > 50) {
                    valid = false;
                    error = parent.find('.bad-between-number');
                    error.show();
                    error.addClass('activeError');
                }
            }

            //console.log("Valid: ", valid);
            return valid;
        }

        input.on('input', revalidate);

        _on_save.push(function(){
            return revalidate(true);
        });
    }

    function textFieldValidator(field) {
        var parent = $('#'+field.id+'-parent');
        var input = $('#'+field.id);


        function revalidate(scroll) {
            parent.find('.validator-error').removeClass('activeError');
            parent.find('.validator-error').hide();
            var valid = true;

            console.log(input.val().length);

            var error;
            // checking that there is no more than 5 words here!
            if (field.id == "keyWords") {
                var words = $.map(input.val().split(/[\s,]+/), function (el) { return el.trim(); } );
                if (words.length > 5) {
                    valid = false;
                    error = parent.find('.many-words');
                    error.show();
                    error.addClass('activeError');
                }
            }

            if (input.val().length >= field.max) {
                valid = false;
                error = parent.find('.too-long');
                error.show();
                error.addClass('activeError');
            }

            if(!field.optional) {
                if(input.val().length === 0) {
                    valid = false;
                    error = parent.find('.error-empty');
                    error.show();
                    error.addClass('activeError');
                }
            }

            //console.log("Valid: ", valid);
            return valid;
        }

        input.on('input', revalidate);

        _on_save.push(function(){
            return revalidate(true);
        });
    }

    var _validators = {
        text: textFieldValidator,
        description: textFieldValidator,
        number: numValidator,
        isbn: isbnValidator
    };

    /**
     * Validate form before send
     * return true if everything is ok
     */
    this.validate = function() {
        var res = true;
        for(var i=0; i<_on_save.length; ++i) {
            res = res && _on_save[i]();
        }
        return res;
    };

    var fields = options.fields;
    for(var id in fields) {
        var field = fields[id];
        var type = field.type;

        if(type in _validators) {
            _validators[type](field, true);
        } else {
            console.error("NO VALIDATOR FOR TYPE: ", type);
        }
    }
}


$(function(){
    var forms = {};
    if(typeof(form) != "undefined") {
        forms = form;
    }

    $(".validate-form").each(function(){
        var f = $(this);
        var name = f.attr('data-form-name');

        var form = forms[name];
        if(!form) {
            console.error("FORM NOT FOUND", name);
        } else {
            form.validator = new FormValidator(form);

            f.submit(function(event){
                var valid = form.validator.validate();
                if(valid) {
                    return true;
                } else {
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: $('.activeError').offset().top-150
                    }, 500);
                    return false;

                }
            });
        }

    });

    var $descriptionForm = $('.description-form');
    //TODO: definitely not here
    //Save popup
    var changes_saved = true;
    var active_link=null;
    $('.container').on('input',function(){
        changes_saved = false;
    });
    $('.container').on('change',function(){
        changes_saved = false;
    });

    $descriptionForm.on('submit',function(){
        changes_saved=true;
        console.log('submit');
    });
    window.onbeforeunload = function(e){
        if(!changes_saved){
            return warning;
        }
    };
    $('.navbar a').click(function(event){
        if(!changes_saved){
            event.preventDefault();
            active_link = $(this);
            $('#before-unload-warning').modal('show');
        }else{
            window.location = $(this).attr("href");
        }
    });
    $("#warning-save").click(function(e){
        $.post('',$descriptionForm.serialize()).done(function( data ) {
            changes_saved = true;
            window.location = active_link.attr("href");
        });
       console.log($descriptionForm.serialize());
        //$('#to-submit').click();
        $('#before-unload-warning').modal('hide');

    });
    $("#warning-discard").click(function(){
        $('#before-unload-warning').modal('hide');
        window.location = active_link.attr('href');
        window.onbeforeunload = function(){

        };
    });

    // contributors
    //var $descriptionForm = $('.description-form');

    // Add button click handler
    $descriptionForm.on('click', '.add-contributor', function() {
        console.log($(this).attr("data-field"));
        //console.log($('.optionTemplate').find($(this).attr("data-field")));
        if ($(this).attr("data-field") == "contributors") {
            var $template = $('#optionTemplate'),
                $clone    = $template
                    .clone()
                    .removeClass('hide')
                    .removeAttr('id')
                    .insertBefore($template);
        }
        else if ($(this).attr("data-field") == "contributorsEnglish") {
            var $template = $('#optionTemplateEnglish'),
                $clone    = $template
                    .clone()
                    .removeClass('hide')
                    .removeAttr('id')
                    .insertBefore($template);
        }

    })
        // Remove button click handler
        .on('click', '.remove-contributor', function() {
            var $row    = $(this).parents('.contributor');

            // Remove element containing the option
            $row.remove();
        });

    // categories
    var $categories = $('.category');
    var $subcategories = $('.subcategory').hide();
    function redrawSubcategories () {
        $categories.each(function () {
            var $category = $(this);
            var categoryId = $category.val();
            var categoryField = $category.attr('id');
            $subcategories.each(function () {
                var $subcategory = $(this);
                if ($subcategory.data('category') == categoryField) {
                    if ($subcategory.data('parent') == categoryId) {
                        $subcategory.show();
                        $subcategory.attr('disabled', false);
                    } else {
                        $subcategory.hide();
                        $subcategory.attr('disabled', true);
                    }
                }
            });
        });
    }
    redrawSubcategories();

    var $categoryGroups = $('.category-group');
    var $addCategory = $('.add-category');
    var $removeCategory = $('.remove-category');

    $categories.on('change', function () {
        var $this = $(this);
        redrawSubcategories();
        $this.parents('.category-group').attr('data-category', $this.val());
        displayControls();
    });

    $addCategory.on('click', function (e) {
        var $category = getByData($categoryGroups, 'visible', false);
        $category.data('visible', true);
        $category.show();
        displayControls();
        e.preventDefault();
    });
    $removeCategory.on('click', function (e) {
        var $this = $(this);
        var $category = $this.parents('.category-group');
        $category.data('visible', false);
        $category.data('category', 'architecture').find('.category').val('architecture');
        redrawSubcategories();
        $category.hide();
        displayControls();
        e.preventDefault();
    });

    function displayControls () {
        if (isFull()) {
            $addCategory.hide();
            $removeCategory.show();
        }
        if (isOne()) {
            $removeCategory.hide();
            $addCategory.show();
        }
    }

    function hideSecondCategory() {
        //maybe better way to do it?
        var count = 0;
        $categoryGroups.each(function () {
            var $category = $(this);
            count++;
            if (count == 2) {
                $category.data('visible', false);
                $category.hide();
                displayControls();
            }
        });
    }

    //hideSecondCategory();
    //displayControls();
    hideNoCategory();


    function getByData ($element, data, value) {
        return $element.filter(function (){
            return $(this).data(data) == value;
        });


    }
    function hideNoCategory () {
        $categoryGroups.each(function () {
            var $this = $(this);
            if ($this.data('visible') === false) {
                $this.hide();
            }
        });
    }
    function isFull () {
        return isCount(2);
    }
    function isOne () {
        return isCount(1);
    }
    function isEmpty () {
        return isCount(0);
    }
    function isCount (number) {
        var count = 0;
        $categoryGroups.each(function () {
            if ($(this).data('visible') === true) {
                count++;
            }
        });
        return count == number;
    }
});
