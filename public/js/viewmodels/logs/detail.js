define(['jquery', 'knockout', 'moment', 'marked'], function($, ko, moment, marked) {
  'use strict';
  var api, bcc, cc, date, from, generateTextFromHTML, html, init, partial, replyTo, sendersName, status, subject, text, title, to;
  title = 'E-mail Log Detail';
  partial = 'partials/logs/detail.html';
  api = 'api/email-logs/';
  status = ko.observable();
  date = ko.observable();
  bcc = ko.observable();
  cc = ko.observable();
  from = ko.observable();
  generateTextFromHTML = ko.observable();
  html = ko.observable();
  replyTo = ko.observable();
  sendersName = ko.observable();
  subject = ko.observable();
  text = ko.observable();
  to = ko.observable();
  init = function(id) {
    var getLog, getPartial, self;
    self = this;
    getPartial = $.get(partial);
    getLog = $.get(api + id);
    return $.when(getPartial, getLog).done(function(mu, log) {
      var t;
      t = log[0];
      status(t.statusCode);
      date(moment(t.date).format('lll'));
      bcc(t.email.bcc);
      cc(t.email.cc);
      from(t.email.from);
      generateTextFromHTML(t.email.generateTextFromHTML);
      html(t.email.html);
      replyTo(t.email.replyTo);
      subject(t.email.subject);
      text(t.email.text);
      to(t.email.to);
      app.resetMessage();
      app.updateTitle(title);
      ko.cleanNode(app.els.main[0]);
      app.els.main.empty().html(mu[0]);
      return ko.applyBindings(self, app.els.main[0]);
    });
  };
  return {
    status: status,
    date: date,
    bcc: bcc,
    cc: cc,
    from: from,
    generateTextFromHTML: generateTextFromHTML,
    html: html,
    replyTo: replyTo,
    sendersName: sendersName,
    subject: subject,
    text: text,
    to: to,
    init: init
  };
});
