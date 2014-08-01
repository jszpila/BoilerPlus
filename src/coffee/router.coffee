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
      r = new Router().init '/'

      r.on '/', () ->
        indexVM.init()

      r.on '/test1', () ->
        test1VM.init()

      r.on '/test2/:param', (param) ->
        test2VM.init(param)

    # Public
    init: init

