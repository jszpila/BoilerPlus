define(['jquery', 'knockout', 'moment'], function($, ko, moment) {
  'use strict';
  var api, count, curPg, emailLogs, formatDate, init, maxPg, nextClass, onNextClick, onPrevClick, partial, prevClass, resPerPage, status, title, updateResults;
  title = 'E-mail Logs';
  partial = 'partials/logs/index.html';
  api = 'api/email-logs';
  resPerPage = 25;
  emailLogs = ko.observableArray();
  count = ko.observable();
  curPg = ko.observable(1);
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
  onNextClick = function(data, event) {
    curPg(parseInt(curPg()) + 1);
    updateResults(curPg());
    return app.router.navigate('logs/pg/' + curPg());
  };
  onPrevClick = function(data, event) {
    curPg(parseInt(curPg()) - 1);
    updateResults(curPg());
    return app.router.navigate('logs/pg/' + curPg());
  };
  updateResults = function(pg) {
    var getCount, getLogs, uri;
    getLogs = null;
    getCount = $.get('api/email-logs/count');
    uri = api;
    if (pg) {
      uri += '?page=' + pg;
    }
    getLogs = $.get(uri);
    return $.when(getLogs, getCount).done(function(logs, c) {
      count(c[0].count);
      return emailLogs(logs[0].emailLogs);
    });
  };
  formatDate = function(date) {
    return moment(date).format('lll');
  };
  init = function(pg) {
    var getCount, getLogs, getPartial, self, uri;
    self = this;
    getPartial = $.get(partial);
    getLogs = null;
    getCount = $.get('api/email-logs/count');
    uri = api;
    if (pg) {
      curPg(pg);
      uri += '?page=' + pg;
    }
    getLogs = $.get(uri);
    return $.when(getPartial, getLogs, getCount).done(function(mu, logs, c) {
      count(c[0].count);
      emailLogs(logs[0].emailLogs);
      app.resetMessage();
      app.updateTitle(title);
      ko.cleanNode(app.els.main[0]);
      app.els.main.empty().html(mu[0]);
      return ko.applyBindings(self, app.els.main[0]);
    });
  };
  return {
    count: count,
    emailLogs: emailLogs,
    status: status,
    nextClass: nextClass,
    prevClass: prevClass,
    init: init,
    formatDate: formatDate,
    onNextClick: onNextClick,
    onPrevClick: onPrevClick
  };
});
