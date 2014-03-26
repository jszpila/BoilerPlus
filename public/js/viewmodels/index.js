define(['jquery', 'knockout'], function($, ko) {
  'use strict';
  var helloTxt, init, loremTxt, partial, title;
  title = 'Index';
  partial = 'partials/index.html';
  helloTxt = ko.observable('Hello World!');
  loremTxt = ko.observable('This is my web app. There are many like it but this one is mine.');
  init = function() {
    var self;
    self = this;
    return $.get(partial, function(mu) {
      app.setTitle(title);
      ko.cleanNode(app.els.main[0]);
      app.els.main.empty().html(mu);
      return ko.applyBindings(self, app.els.main[0]);
    });
  };
  return {
    helloTxt: helloTxt,
    loremTxt: loremTxt,
    init: init
  };
});
