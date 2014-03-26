define(['jquery', 'knockout', 'underscore', 'backbone', 'platform', 'routes'], function($, ko, _, backbone, platform, routes) {
  'use strict';
  var checkFeatures, els, features, init, router, setNav, setTitle, setViewModel;
  router = new routes();
  els = {
    html: $('html'),
    body: $('body'),
    title: $('title'),
    nav: $('#Nav'),
    main: $('#Main'),
    curNav: $('#home')
  };
  features = ['localstorage', 'hashchange'];
  setTitle = function(title) {
    return els.title.text('BoilerPlus / ' + title);
  };
  setNav = function() {
    var navItem, segment;
    segment = document.URL.split('#')[1];
    navItem = null;
    if (els.curNav) {
      els.curNav.removeClass('active');
    }
    if (segment) {
      navItem = $('#' + segment);
      navItem.addClass('active');
      return els.curNav = navItem;
    } else {
      return els.curNav = null;
    }
  };
  setViewModel = function(vm, title, markup) {
    setTitle(title);
    setNav();
    ko.cleanNode(els.main[0]);
    els.main.empty().html(markup);
    return ko.applyBindings(vm, els.main[0]);
  };
  checkFeatures = function() {
    var f, hasFeatures, _i, _len;
    hasFeatures = true;
    for (_i = 0, _len = features.length; _i < _len; _i++) {
      f = features[_i];
      if (!els.html.hasClass(f)) {
        hasFeatures = false;
        break;
      }
    }
    return hasFeatures;
  };
  init = function() {
    if (checkFeatures()) {
      els.body.addClass(platform.name.toLowerCase());
      els.body.addClass(platform.os.family.toLowerCase().replace(RegExp(' ', 'g'), '-'));
      return Backbone.history.start();
    } else {

    }
  };
  return {
    els: els,
    router: router,
    init: init,
    setTitle: setTitle,
    setNav: setNav,
    setViewModel: setViewModel
  };
});
