define(['jquery', 'knockout'], function($, ko) {
  'use strict';
  var api, init, onLoginClick, partial, password, title, username;
  title = 'Login';
  partial = 'partials/login.html';
  api = 'api/login';
  username = ko.observable('');
  password = ko.observable('');
  init = function() {
    var self;
    self = this;
    return $.get(partial, function(mu) {
      app.resetMessage();
      app.updateTitle(title);
      ko.cleanNode(app.els.main[0]);
      app.els.main.empty().html(mu);
      return ko.applyBindings(self, app.els.main[0]);
    });
  };
  onLoginClick = function(data, event) {
    if (username() === '' || password === '') {
      return app.showMessage('Username and passord are required.', 'alert alert-danger');
    } else {
      return $.ajax({
        dataType: 'json',
        type: 'POST',
        url: api,
        data: {
          username: username(),
          password: password()
        },
        beforeSend: function(xhr) {
          return xhr.setRequestHeader('Accept-Version', '0.1');
        },
        error: function(res) {
          return app.showMessage('Invalid username or password.', 'alert alert-danger');
        },
        success: function(res) {
          app.resetMessage();
          app.logIn();
          app.router.navigate('dashboard', {
            trigger: true
          });
          username('');
          return password('');
        }
      });
    }
  };
  return {
    username: username,
    password: password,
    init: init,
    onLoginClick: onLoginClick
  };
});
