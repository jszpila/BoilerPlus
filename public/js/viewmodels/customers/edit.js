define(['jquery', 'knockout'], function($, ko) {
  'use strict';
  var api, cId, cName, formIsValid, init, onSaveClick, partial, processing, title;
  title = 'Edit Customer';
  partial = 'partials/customers/edit.html';
  api = 'api/customers/';
  cName = ko.observable();
  cId = ko.observable();
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
  init = function(id) {
    var getCustomer, getPartial, self;
    self = this;
    getPartial = $.get(partial);
    getCustomer = $.get(api + id);
    return $.when(getPartial, getCustomer).done(function(mu, cst) {
      var c;
      c = cst[0];
      cName(c.name);
      cId(c._id);
      app.resetMessage();
      app.updateTitle(title);
      ko.cleanNode(app.els.main[0]);
      app.els.main.empty().html(mu[0]);
      return ko.applyBindings(self, app.els.main[0]);
    });
  };
  onSaveClick = function(data, event) {
    $('.has-error').removeClass('has-error');
    if (formIsValid()) {
      data = 'name=' + cName();
      app.resetMessage();
      processing(true);
      return $.ajax({
        url: 'api/customers/' + cId(),
        data: data,
        type: 'PUT',
        success: function(res) {
          app.showMessage('Customer updated successfully.', 'alert alert-success');
          return processing(false);
        },
        error: function(res) {
          app.showMessage(res.responseJSON, 'alert alert-danger');
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
    cId: cId,
    processing: processing,
    init: init,
    onSaveClick: onSaveClick
  };
});
