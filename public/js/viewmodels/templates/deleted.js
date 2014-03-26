define(['jquery', 'knockout'], function($, ko) {
  'use strict';
  var api, count, curPg, getSelectedTemplates, init, maxPg, nextClass, onNextClick, onPrevClick, onRestoreClick, partial, prevClass, processing, resPerPage, restoreTemplates, status, templates, title, updateResults;
  title = 'Deleted E-mail Templates';
  partial = 'partials/templates/deleted.html';
  api = 'api/email-template?deleted=true';
  resPerPage = 25;
  templates = ko.observableArray();
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
  onRestoreClick = function(data, event) {
    if (confirm('Restore selected templates?')) {
      processing(true);
      return getSelectedTemplates('restore', restoreTemplates);
    }
  };
  onNextClick = function(data, event) {
    curPg(parseInt(curPg()) + 1);
    updateResults(curPg());
    return app.router.navigate('deleted/pg/' + curPg());
  };
  onPrevClick = function(data, event) {
    curPg(parseInt(curPg()) - 1);
    updateResults(curPg());
    return app.router.navigate('deleted/pg/' + curPg());
  };
  getSelectedTemplates = function(type, cb) {
    var tpls;
    tpls = [];
    $('input:checkbox[name=' + type + ']:checked').each(function() {
      return tpls.push({
        id: $(this).val(),
        el: $(this).parent().parent()
      });
    });
    if (tpls.length > 0) {
      return cb(tpls);
    }
  };
  restoreTemplates = function(tpls) {
    var defers, tpl, _i, _len;
    defers = [];
    for (_i = 0, _len = tpls.length; _i < _len; _i++) {
      tpl = tpls[_i];
      defers.push($.ajax({
        url: 'api/email-template/' + tpl.id + '/restore',
        type: 'POST'
      }));
    }
    return $.when.apply($, defers).then((function(res) {
      app.showMessage('Templates deleted successfully.', 'alert alert-success');
      updateResults();
      return processing(false);
    }), function(res) {
      app.showMessage('There has been an error deleting the selected templates. Try again later.', 'alert alert-danger');
      return processing(false);
    });
  };
  updateResults = function(pg) {
    var getCount, getTemplates, uri;
    getTemplates = null;
    getCount = $.get('api/email-template/count?deleted=true');
    uri = api;
    if (pg) {
      uri += '?page=' + pg;
    }
    getTemplates = $.get(uri);
    return $.when(getTemplates, getCount).done(function(tpls, c) {
      count(c[0].count);
      return templates(tpls[0].emailTemplates);
    });
  };
  init = function(pg) {
    var getCount, getPartial, getTemplates, self, uri;
    self = this;
    getPartial = $.get(partial);
    getTemplates = null;
    getCount = $.get('api/email-template/count?deleted=true');
    uri = api;
    if (pg) {
      curPg(pg);
      uri += '?page=' + pg;
    }
    getTemplates = $.get(uri);
    return $.when(getPartial, getTemplates, getCount).done(function(mu, tpls, c) {
      count(c[0].count);
      templates(tpls[0].emailTemplates);
      app.resetMessage();
      app.updateTitle(title);
      ko.cleanNode(app.els.main[0]);
      app.els.main.empty().html(mu[0]);
      return ko.applyBindings(self, app.els.main[0]);
    });
  };
  return {
    count: count,
    templates: templates,
    status: status,
    nextClass: nextClass,
    prevClass: prevClass,
    processing: false,
    init: init,
    onRestoreClick: onRestoreClick,
    onNextClick: onNextClick,
    onPrevClick: onPrevClick
  };
});
