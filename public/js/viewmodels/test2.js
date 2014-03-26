define(['jquery', 'knockout'], function($, ko) {
  'use strict';
  var helloTxt, init, loremTxt, partial, title;
  title = 'Test 2';
  partial = 'partials/index.html';
  helloTxt = ko.observable('Test 2');
  loremTxt = ko.observable('hotdog 3D-printed voodoo god Chiba papier-mache sensory faded sub-orbital drugs silent meta- claymore mine realism.');
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
