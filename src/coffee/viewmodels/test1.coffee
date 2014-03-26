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
  title = 'Test 1'
  partial = 'partials/index.html'

  # Observable
  helloTxt = ko.observable 'Test 1'
  loremTxt = ko.observable 'tower tank-traps convenience store math- drone computer decay dead garage semiotics tiger-team 8-bit stimulate.'

  # Methods
  # Initialize the view model
  init = () ->
    self = this

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
