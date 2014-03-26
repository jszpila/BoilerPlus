#################################################
#
# Primary app module
#
#################################################

define [
  'jquery'
  'knockout'
  'underscore'
  'backbone'
  'platform'
  'routes'
],
($, ko, _, backbone, platform, routes) ->
  'use strict'

  ##############################
  # Private
  ##############################
  router = new routes()
  els =
    html: $('html')
    body: $('body')
    title: $('title')
    nav: $('#Nav')
    main: $('#Main')
    curNav: $('#home')

  features = ['localstorage', 'hashchange']

  ## Util
  # Update the page's title
  # title - str - title to use for page
  setTitle = (title) ->
    els.title.text 'BoilerPlus / ' + title

  # Update the page's navigation
  setNav = () ->
    segment = document.URL.split('#')[1]
    navItem = null

    if (els.curNav)
      els.curNav.removeClass 'active'

    if (segment)
      navItem = $('#' + segment)
      # split @ / to find sub-nav
      # set sub-nav
      navItem.addClass 'active'
      els.curNav = navItem
    else
      els.curNav = null

  # Change the currently applied view model
  setViewModel = (vm, title, markup) ->
    setTitle title
    setNav()
    ko.cleanNode els.main[0]
    els.main.empty().html markup
    ko.applyBindings vm, els.main[0]

  # Determine if required features, as detected by Modernizr, are present
  checkFeatures = () ->
    hasFeatures = true

    for f in features
      if !els.html.hasClass f
        hasFeatures = false
        break

    hasFeatures

  # Initialize the app
  init = () ->
    if checkFeatures()
      # Add browser and OS classes to assist in targeting fixes
      els.body.addClass platform.name.toLowerCase()
      els.body.addClass platform.os.family.toLowerCase().replace(RegExp(' ', 'g'), '-')

      Backbone.history.start()
    else
      # display message

    # test request for proxy server
    # $.get '/test', (res) ->
    #   console.log res.test

  ##############################
  # Public
  ##############################
  # Members
  els: els
  router: router

  # Methods
  init: init
  setTitle: setTitle
  setNav: setNav
  setViewModel: setViewModel
