#################################################
#
# Application router module
#
#################################################

define [
  'director'
  'viewmodels/index'
  'viewmodels/test1'
  'viewmodels/test2'
  ],
  (director, indexVM, test1VM, test2VM) ->
    'use strict'

    init = () ->
      # TODO - fix issue with routes not matching on refresh despite r.getRoute 0 being correct?
      r = new Router().init '/'

      r.on '/', () ->
        indexVM.init()

      r.on 'test1', () ->
        test1VM.init()

      r.on 'test2/:param', (param) ->
        test2VM.init(param)

    # Public
    init: init

