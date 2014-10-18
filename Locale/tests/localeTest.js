var assert = require('assert');
var localeHolder = require('../localeHolder');

var modules = localeHolder.getModulesWithLocale();
var supported_locales = localeHolder.getLocales();

modules.forEach(function(module){
    describe('Check missing locales: '+module, function(){
        supported_locales.forEach(function(locale){
            describe('Locale: '+locale, function(){
                var missing = localeHolder.getMissingTranslation(module, locale);
                if(missing.length == 0) {
                    //Nothing missing
                    it('everything in place', function(){

                    });
                } else {
                    //Fail in each missing tag
                    missing.forEach(function(tag){
                        it('missing: '+tag, function(){
                            assert(false, tag);
                        });
                    });
                }
            });
        });
    }) ;
});


