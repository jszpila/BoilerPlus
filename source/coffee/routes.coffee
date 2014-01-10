#################################################
#
# Application router module
#
#################################################

define [
  'underscore'
  'backbone'
  'viewmodels/index'
  ], 
  (_, backbone, indexVM) ->
    'use strict'

    # Public
    routes = Backbone.Router.extend
      routes:
        '': () ->
          indexVM.init()
