define(['underscore', 'backbone', 'viewmodels/index'], function(_, backbone, indexVM) {
  'use strict';
  var routes;
  return routes = Backbone.Router.extend({
    routes: {
      '': function() {
        return indexVM.init();
      }
    }
  });
});
