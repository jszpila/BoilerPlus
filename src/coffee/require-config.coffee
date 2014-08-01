#################################################
#
# Global require configuration
#
#################################################
'use strict'

require.config
  paths:
    jquery:     '../vendor/js/jquery'
    knockout:   '../vendor/js/knockout-latest.debug'
    backbone:   '../vendor/js/backbone'
    underscore: '../vendor/js/underscore'
    platform:   '../vendor/js/platform'
    tbs:        '../vendor/js/bootstrap'
    director:   '../vendor/js/director'

  shim:
    underscore:
      exports: '_'
    backbone:
      deps: ['underscore', 'jquery']
      exports: 'Backbone'
    tbs:
      deps: ['jquery']

# Start it up
require ['app', 'jquery', 'director', 'tbs'],
  (app, $) ->
    # Add global reference to app object
    window.app = window.app || app
    app.init()
