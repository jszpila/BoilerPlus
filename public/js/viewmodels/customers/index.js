define(['jquery', 'knockout'], function($, ko) {
  'use strict';
  var api, count, curPg, customerLink, customers, deleteCustomers, getSelectedcustomers, init, maxPg, nextClass, onDeleteClick, onNextClick, onPrevClick, partial, prevClass, processing, resPerPage, status, title, updateResults;
  title = 'Customers';
  partial = 'partials/customers/index.html';
  api = 'api/customers';
  resPerPage = 25;
  customers = ko.observableArray();
  count = ko.observable();
  curPg = ko.observable(1);
  processing = ko.observable(false);
  maxPg = ko.computed(function() {
    return Math.ceil(count() / resPerPage) || 1;
  });
  status = ko.computed(function() {
    var endAt, startAt;
    startAt = 1;
    endAt = resPerPage;
    if (curPg() > 1) {
      startAt = (parseInt(curPg()) - 1) * resPerPage;
      endAt = parseInt(curPg()) * resPerPage;
    }
    if (parseInt(curPg()) === parseInt(maxPg())) {
      endAt = count();
    }
    return startAt + ' - ' + endAt + ' of ' + count();
  });
  nextClass = ko.computed(function() {
    var cls;
    cls = '';
    if (parseInt(curPg()) === parseInt(maxPg())) {
      cls = 'disabled';
    }
    return cls;
  });
  prevClass = ko.computed(function() {
    var cls;
    cls = '';
    if (parseInt(curPg()) === 1) {
      cls = 'disabled';
    }
    return cls;
  });
  customerLink = function(data) {
    return '#customer/' + data._id;
  };
  onDeleteClick = function(data, event) {
    if (confirm('Delete selected customers?')) {
      processing(true);
      return getSelectedcustomers('delete', deleteCustomers);
    }
  };
  onNextClick = function(data, event) {
    curPg(parseInt(curPg()) + 1);
    app.router.navigate('customers/pg/' + curPg());
    return updateResults(curPg());
  };
  onPrevClick = function(data, event) {
    curPg(parseInt(curPg()) - 1);
    app.router.navigate('customers/pg/' + curPg());
    return updateResults(curPg());
  };
  getSelectedcustomers = function(type, cb) {
    var csts;
    csts = [];
    $('input:checkbox[name=' + type + ']:checked').each(function() {
      return csts.push({
        id: $(this).val(),
        el: $(this).parent().parent()
      });
    });
    if (csts.length > 0) {
      return cb(csts);
    }
  };
  deleteCustomers = function(csts) {
    var cst, defers, _i, _len;
    defers = [];
    for (_i = 0, _len = csts.length; _i < _len; _i++) {
      cst = csts[_i];
      defers.push($.ajax({
        url: api + '/' + cst.id,
        type: 'DELETE'
      }));
    }
    return $.when.apply($, defers).then((function(res) {
      app.showMessage('Customer deleted successfully.', 'alert alert-success');
      updateResults();
      return processing(false);
    }), function(res) {
      app.showMessage('There has been an error deleting the selected customers. Try again later.', 'alert alert-danger');
      return processing(false);
    });
  };
  updateResults = function(pg) {
    var getCount, getCustomers, getcustomers, uri;
    getcustomers = null;
    getCount = $.get(api + '/count?deleted=false');
    uri = api;
    if (pg) {
      uri += '?page=' + pg;
    }
    getCustomers = $.get(uri);
    return $.when(getCustomers, getCount).done(function(csts, c) {
      count(c[0].count);
      return customers(csts[0].customers);
    });
  };
  init = function(pg) {
    var getCount, getCustomers, getPartial, self, uri;
    self = this;
    getPartial = $.get(partial);
    getCustomers = null;
    getCount = $.get(api + '/count?deleted=false');
    uri = api;
    if (pg) {
      curPg(pg);
      uri += '?page=' + pg;
    }
    getCustomers = $.get(uri);
    return $.when(getPartial, getCustomers, getCount).done(function(mu, csts, c) {
      count(c[0].count);
      customers(csts[0].customers);
      app.resetMessage();
      app.updateTitle(title);
      ko.cleanNode(app.els.main[0]);
      app.els.main.empty().html(mu[0]);
      return ko.applyBindings(self, app.els.main[0]);
    });
  };
  return {
    count: count,
    customers: customers,
    status: status,
    nextClass: nextClass,
    prevClass: prevClass,
    processing: processing,
    init: init,
    customerLink: customerLink,
    onDeleteClick: onDeleteClick,
    onNextClick: onNextClick,
    onPrevClick: onPrevClick
  };
});
