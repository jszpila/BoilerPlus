define(['jquery', 'knockout'], function($, ko) {
  'use strict';
  var helloTxt, init, loremTxt, partial, title;
  title = 'Home';
  partial = 'partials/index.html';
  helloTxt = ko.observable('Hello World!');
  loremTxt = ko.observable('This is my web app. There are many like it but this one is mine.');
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
