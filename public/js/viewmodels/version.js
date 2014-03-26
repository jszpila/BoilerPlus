define(['jquery', 'knockout'], function($, ko, v) {
  'use strict';
  var api, client, init, partial, server, title;
  title = 'Version';
  partial = 'partials/version.html';
  api = 'api/version';
  server = ko.observable();
  client = ko.observable('13.12.20-KO');
  init = function() {
    var getPartial, getServer, self;
    self = this;
    getPartial = $.get(partial);
    getServer = $.get(api);
    return $.when(getServer, getPartial).done(function(sv, mu) {
      server(sv[0].version);
      app.resetMessage();
      app.updateTitle(title);
      ko.cleanNode(app.els.main[0]);
      app.els.main.empty().html(mu[0]);
      return ko.applyBindings(self, app.els.main[0]);
    });
  };
  return {
    server: server,
    client: client,
    init: init
  };
});
