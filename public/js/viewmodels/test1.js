define(['jquery', 'knockout'], function($, ko) {
  'use strict';
  var helloTxt, init, loremTxt, partial, title;
  title = 'Test 1';
  partial = 'partials/index.html';
  helloTxt = ko.observable('Test 1');
  loremTxt = ko.observable('tower tank-traps convenience store math- drone computer decay dead garage semiotics tiger-team 8-bit stimulate.');
  init = function() {
    var self;
    self = this;
    return $.get(partial, function(html) {
      return app.setViewModel(self, title, html);
    });
  };
  return {
    helloTxt: helloTxt,
    loremTxt: loremTxt,
    init: init
  };
});
