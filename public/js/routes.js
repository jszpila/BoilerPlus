define(['underscore', 'backbone', 'viewmodels/index', 'viewmodels/test1', 'viewmodels/test2'], function(_, backbone, indexVM, test1VM, test2VM) {
  'use strict';
  var routes;
  return routes = Backbone.Router.extend({
    routes: {
      '': function() {
        return indexVM.init();
      },
      'test1': function() {
        return test1VM.init();
      },
      'test2': function() {
        return test2VM.init();
      }
    }
  });
});
