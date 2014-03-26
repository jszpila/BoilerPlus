define(['jquery', 'underscore', 'backbone', 'platform', 'routes'], function($, _, backbone, platform, routes) {
  'use strict';
  var els, init, router, setTitle;
  router = new routes();
  els = {
    body: $('body'),
    title: $('title'),
    nav: $('#Nav'),
    main: $('#Main')
  };
  setTitle = function(title) {
    return els.title.text('BoilerPlus / ' + title);
  };
  init = function() {
    $.get('test', function(res) {
      return console.log(res);
    });
    els.body.addClass(platform.name.toLowerCase());
    els.body.addClass(platform.os.family.toLowerCase().replace(RegExp(' ', 'g'), '-'));
    return Backbone.history.start();
  };
  return {
    els: els,
    router: router,
    init: init,
    setTitle: setTitle
  };
});
