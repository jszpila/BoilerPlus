#################################################
#
# Application router module
#
#################################################

define [
  'underscore'
  'backbone'
  'viewmodels/index'
  'viewmodels/test1'
  'viewmodels/test2'
  ], 
  (_, backbone, indexVM, test1VM, test2VM) ->
    'use strict'

    # Public
    routes = Backbone.Router.extend
      routes:
        '': () ->
          indexVM.init()

        'test1': () ->
          test1VM.init()

        'test2': () ->
          test2VM.init()
