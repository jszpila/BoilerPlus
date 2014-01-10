#################################################
#
# Primary app module
#
#################################################

define [
  'jquery'
  'underscore'
  'backbone'
  'platform' 
  'routes'
  ], 
  ($, _, backbone, platform, routes) ->
    'use strict'

    ##############################
    # Private
    ##############################
    router = new routes()
    els =
      body: $('body')
      title: $('title')
      nav: $('#Nav')
      main: $('#Main')

    ## Util
    # Update the page's title
    # title - str - title to use for page
    setTitle = (title) ->
      els.title.text 'UniB Admin / ' + title

    # Initialize the app
    init = () ->
      # Configure global handler for authentication errors
      $(document).ajaxError (event, jqxhr, settings, exception) ->
        if jqxhr.status is 401
          logOut()

      # Add browser and OS classes to assist in targeting fixes
      els.body.addClass platform.name.toLowerCase()
      els.body.addClass platform.os.family.toLowerCase().replace(RegExp(' ', 'g'), '-')

      Backbone.history.start()

    ##############################
    # Public
    ##############################
    # Members
    els: els
    router: router

    # Methods
    init: init
    setTitle: setTitle
