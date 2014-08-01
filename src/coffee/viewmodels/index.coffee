##########################################################################
#
# Module for index page
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
  title = 'Home'
  partial = 'partials/index.html'

  # Observable
  helloTxt = ko.observable 'Hello World!'
  loremTxt = ko.observable 'This is my web app. There are many like it but this one is mine.'

  # Methods
  # Initialize the view model
  init = () ->
    self = this

    $.get partial, (html) ->
      app.setViewModel self, title, html

  test = () ->
    console.log this

  ##############################
  # Public
  ##############################
  # Members
  helloTxt: helloTxt
  loremTxt: loremTxt

  # Methods
  init: init
  test: test
