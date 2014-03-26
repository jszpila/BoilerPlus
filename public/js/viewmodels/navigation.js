define(['jquery', 'knockout'], function($, ko) {
  'use strict';
  var init, loggedIn, logoLink, onLogoutClick, partial;
  partial = 'partials/navigation.html';
  loggedIn = ko.observable(false);
  logoLink = ko.observable('#');
  init = function() {
    var self;
    self = this;
    return $.get(partial, function(mu) {
      app.els.nav.empty().html(mu);
      ko.applyBindings(self, app.els.nav[0]);
      return $.get('api/me', function(me) {
        loggedIn(true);
        return logoLink('#dashboard');
      });
    });
  };
  onLogoutClick = function() {
    return $.get('api/logout', function() {
      return app.logOut();
    });
  };
  return {
    init: init,
    loggedIn: loggedIn,
    logoLink: logoLink,
    onLogoutClick: onLogoutClick
  };
});
