#################################################
#
# Global require configuration
#
#################################################
'use strict'

require.config
  shim:
    underscore:
      exports: '_'
    backbone:
      deps: ['underscore', 'jquery']
      exports: 'Backbone'

  paths:
    jquery: '../vendor/js/jquery'
    knockout: '../vendor/js/knockout'
    backbone: '../vendor/js/backbone'
    underscore: '../vendor/js/underscore'
    moment: '../vendor/js/moment'
    platform: '../vendor/js/platform'
    bootstrap: '../vendor/js/bootstrap'
    marked: '../vendor/js/marked'

# Start it up
require ['app'], 
  (app) ->
    # Add global reference to app object
    window.app = window.app || app
    app.init()  
