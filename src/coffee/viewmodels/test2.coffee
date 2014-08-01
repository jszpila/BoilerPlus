##########################################################################
#
# Module for test 2 page
#
##########################################################################

define [
  'jquery'
  'knockout'
],
($, ko) ->
  'use strict'

  ##############################
  # Private
  ##############################
  # Members
  # Non-observable
  title = 'Test 2'
  partial = 'partials/index.html'

  # Observable
  helloTxt = ko.observable 'Test 2'
  loremTxt = ko.observable 'hotdog 3D-printed voodoo god Chiba papier-mache sensory faded sub-orbital drugs silent meta- claymore mine realism.'

  # Methods
  # Initialize the view model
  init = (param) ->
    self = this

    loremTxt loremTxt() + ' ' + param

    $.get partial, (html) ->
      app.setViewModel self, title, html

  ##############################
  # Public
  ##############################
  # Members
  helloTxt: helloTxt
  loremTxt: loremTxt

  # Methods
  init: init
