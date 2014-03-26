define(['jquery', 'knockout'], function($, ko) {
  'use strict';
  var init, partial, title;
  title = 'Index';
  partial = 'partials/index.html';
  init = function() {
    var self;
    self = this;
    return $.get(partial, function(mu) {
      app.updateTitle(title);
      ko.cleanNode(app.els.main[0]);
      app.els.main.empty().html(mu);
      return ko.applyBindings(self, app.els.main[0]);
    });
  };
  return {
    init: init
  };
});
