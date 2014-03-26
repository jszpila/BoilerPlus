define(['jquery', 'knockout'], function($, ko) {
  'use strict';
  var api, cId, cName, deleted, init, onDeleteClick, onEditClick, partial, title;
  title = 'Customer Detail';
  partial = 'partials/customers/detail.html';
  api = 'api/customers/';
  cName = ko.observable();
  cId = ko.observable();
  deleted = ko.observable(false);
  init = function(id) {
    var getCustomer, getPartial, self;
    self = this;
    getPartial = $.get(partial);
    getCustomer = $.get(api + id);
    return $.when(getPartial, getCustomer).done(function(mu, cst) {
      var c;
      c = cst[0];
      deleted(false);
      cName(c.name);
      cId(c._id);
      app.resetMessage();
      app.updateTitle(title);
      ko.cleanNode(app.els.main[0]);
      app.els.main.empty().html(mu[0]);
      return ko.applyBindings(self, app.els.main[0]);
    });
  };
  onEditClick = function(data, event) {
    return app.router.navigate('customer/edit/' + cId(), {
      trigger: true
    });
  };
  onDeleteClick = function(data, event) {
    if (confirm('Delete this customer?')) {
      return $.ajax({
        url: api + cId(),
        type: 'DELETE',
        success: function(res) {
          app.showMessage('Customer deleted successfully.', 'alert alert-success');
          return deleted(true);
        },
        error: function(res) {
          return app.showMessage('There has been an error deleting this customer. Try again later.', 'alert alert-danger');
        }
      });
    }
  };
  return {
    cName: cName,
    cId: cId,
    deleted: deleted,
    init: init,
    onEditClick: onEditClick,
    onDeleteClick: onDeleteClick
  };
});
