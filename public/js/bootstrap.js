'use strict';
require.config({
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  },
  paths: {
    jquery: '../vendor/js/jquery',
    knockout: '../vendor/js/knockout',
    backbone: '../vendor/js/backbone',
    underscore: '../vendor/js/underscore',
    moment: '../vendor/js/moment',
    platform: '../vendor/js/platform',
    bootstrap: '../vendor/js/bootstrap',
    marked: '../vendor/js/marked'
  }
});

require(['app'], function(app) {
  window.app = window.app || app;
  return app.init();
});
