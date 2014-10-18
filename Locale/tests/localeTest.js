var assert = require('assert');
var localeHolder = require('../localeHolder');



it('Translation for en', function () {
    assert.equal(1,1);
});

it('Translation for uk', function () {
    assert.equal(1,localeHolder.getModulesWithLocale());
});
