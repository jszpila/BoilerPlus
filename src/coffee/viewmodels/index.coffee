##########################################################################
#
# Module for login page
#
##########################################################################

define [
  'jquery', 
  'knockout'
  ], 
  ($, ko) ->
    'use strict'

    ##############################
    # Private
    ##############################
    # Members
    # Non-observable
    title = 'Index'
    partial = 'partials/index.html'

    # Observable
    helloTxt = ko.observable 'Hello World!'
    loremTxt = ko.observable 'This is my web app. There are many like it but this one is mine.'

    # Methods
    # Initialize the view model
    init = () ->
      self = this

      $.get partial, (mu) ->
        app.setTitle title
        ko.cleanNode app.els.main[0]
        app.els.main.empty().html mu
        ko.applyBindings self, app.els.main[0]

    ##############################
    # Public
    ##############################
    # Members
    helloTxt: helloTxt
    loremTxt: loremTxt

    # Methods
    init: init
