define(['jquery', 'knockout', 'marked'], function($, ko, marked) {
  'use strict';
  var api, bcc, cc, deleted, generateTextBody, htmlBody, init, onCopyClick, onDeleteClick, onEditClick, partial, replyToEmailAddress, sendersName, subject, templateId, templateName, textBody, title, to;
  title = 'E-mail Template Detail';
  partial = 'partials/templates/detail.html';
  api = 'api/email-template/';
  bcc = ko.observable();
  cc = ko.observable();
  generateTextBody = ko.observable();
  htmlBody = ko.observable();
  replyToEmailAddress = ko.observable();
  sendersName = ko.observable();
  subject = ko.observable();
  templateId = ko.observable();
  templateName = ko.observable();
  textBody = ko.observable();
  to = ko.observable();
  deleted = ko.observable(false);
  init = function(id) {
    var getPartial, getTemplate, self;
    self = this;
    getPartial = $.get(partial);
    getTemplate = $.get(api + id);
    return $.when(getPartial, getTemplate).done(function(mu, tpl) {
      var t;
      t = tpl[0];
      deleted(false);
      bcc(t.bcc);
      cc(t.cc);
      generateTextBody(t.generateTextBody);
      htmlBody(t.htmlBody);
      replyToEmailAddress(t.replyToEmailAddress);
      sendersName(t.sendersName);
      subject(t.subject);
      templateId(t.templateId);
      templateName(t.templateName);
      textBody(t.textBody);
      to(t.to);
      app.resetMessage();
      app.updateTitle(title);
      ko.cleanNode(app.els.main[0]);
      app.els.main.empty().html(mu[0]);
      ko.applyBindings(self, app.els.main[0]);
      return $('#HTMLBody').html(marked(htmlBody()));
    });
  };
  onEditClick = function(data, event) {
    return app.router.navigate('template/edit/' + templateId(), {
      trigger: true
    });
  };
  onCopyClick = function(data, event) {
    if (confirm('Duplicate this e-mail template?')) {
      return $.ajax({
        url: api + templateId() + '/clone',
        type: 'POST',
        success: function(res) {
          return app.showMessage('Template copied successfully.', 'alert alert-success');
        },
        error: function(res) {
          return app.showMessage('There has been an error copying this template. Try again later.', 'alert alert-danger');
        }
      });
    }
  };
  onDeleteClick = function(data, event) {
    if (confirm('Delete this email template?')) {
      return $.ajax({
        url: api + templateId(),
        type: 'DELETE',
        success: function(res) {
          app.showMessage('Template deleted successfully.', 'alert alert-success');
          return deleted(true);
        },
        error: function(res) {
          return app.showMessage('There has been an error deleting this template. Try again later.', 'alert alert-danger');
        }
      });
    }
  };
  return {
    bcc: bcc,
    cc: cc,
    generateTextBody: generateTextBody,
    htmlBody: htmlBody,
    replyToEmailAddress: replyToEmailAddress,
    sendersName: sendersName,
    subject: subject,
    templateId: templateId,
    templateName: templateName,
    textBody: textBody,
    to: to,
    deleted: deleted,
    init: init,
    onEditClick: onEditClick,
    onCopyClick: onCopyClick,
    onDeleteClick: onDeleteClick
  };
});
