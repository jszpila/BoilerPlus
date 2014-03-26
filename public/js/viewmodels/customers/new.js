define(['jquery', 'knockout'], function($, ko) {
  'use strict';
  var api, cName, formIsValid, init, onSaveClick, partial, processing, title;
  title = 'New Customer';
  partial = 'partials/customers/new.html';
  api = 'api/customers/';
  cName = ko.observable();
  processing = ko.observable(false);
  formIsValid = function() {
    var errors, field, _ref;
    errors = 0;
    field = null;
    $.each($('#Customer input[required]'), function(i, f) {
      field = $(f);
      if (field.val() === '') {
        field.parent().parent().addClass('has-error');
        return errors++;
      }
    });
    return (_ref = errors === 0) != null ? _ref : {
      "true": false
    };
  };
  init = function() {
    var getPartial, self;
    self = this;
    getPartial = $.get(partial);
    return $.when(getPartial).done(function(mu) {
      cName('');
      app.resetMessage();
      app.updateTitle(title);
      ko.cleanNode(app.els.main[0]);
      app.els.main.empty().html(mu);
      return ko.applyBindings(self, app.els.main[0]);
    });
  };
  onSaveClick = function(data, event) {
    $('.has-error').removeClass('has-error');
    if (formIsValid()) {
      data = 'name=' + cName();
      data += '&shortName=' + cName().replace(RegExp(' ', 'g'), '_');
      app.resetMessage();
      processing(true);
      return $.ajax({
        url: api,
        data: data,
        type: 'POST',
        success: function(res) {
          app.showMessage('Customer created successfully.', 'alert alert-success');
          return processing(false);
        },
        error: function(res) {
          var err, errTxt, _i, _len, _ref;
          errTxt = '<h5>Errors:</h5><ul class="list-unstyled">';
          _ref = res.responseJSON.errors;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            err = _ref[_i];
            errTxt += '<li>' + err + '</li>';
          }
          errTxt += '</ul>';
          app.showMessage(errTxt, 'alert alert-danger');
          return processing(false);
        }
      });
    } else {
      app.showMessage('Please check all required fields.', 'alert alert-danger');
      return processing(false);
    }
  };
  return {
    cName: cName,
    processing: processing,
    init: init,
    onSaveClick: onSaveClick
  };
});
