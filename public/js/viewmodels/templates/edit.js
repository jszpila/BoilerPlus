define(['jquery', 'knockout', 'marked', 'bootstrap'], function($, ko, marked, bootstrap) {
  'use strict';
  var api, bcc, cc, els, formIsValid, generateTextBody, htmlBody, init, metaModels, onPlaceholderClick, onPreviewClick, onSaveClick, onTabClick, partial, processing, replyToEmailAddress, sendersName, subject, templateId, templateName, textBody, title, to;
  title = 'Edit E-mail Template';
  partial = 'partials/templates/edit.html';
  api = 'api/email-template/';
  els = {
    html: null,
    preview: null,
    text: null
  };
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
  metaModels = ko.observableArray();
  processing = ko.observable(false);
  formIsValid = function() {
    var errors, field, _ref;
    errors = 0;
    field = null;
    $.each($('#EmailTemplate input[required]'), function(i, f) {
      field = $(f);
      if (field.val() === '') {
        field.parent().parent().addClass('has-error');
        return errors++;
      }
    });
    if (!generateTextBody() && textBody() === '') {
      errors++;
      els.text.parent().addClass('has-error');
    }
    return (_ref = errors === 0) != null ? _ref : {
      "true": false
    };
  };
  init = function(id) {
    var getMetaModels, getPartial, getTemplate, self;
    self = this;
    getPartial = $.get(partial);
    getTemplate = $.get(api + id);
    getMetaModels = $.get('api/meta-model');
    return $.when(getPartial, getTemplate, getMetaModels).done(function(mu, tpl, mms) {
      var field, fields, m, mm, name, t, _i, _j, _len, _len1;
      t = tpl[0];
      mm = mms[0];
      name = null;
      fields = null;
      for (_i = 0, _len = mm.length; _i < _len; _i++) {
        m = mm[_i];
        name = m.name;
        fields = m.fields.split(',');
        for (_j = 0, _len1 = fields.length; _j < _len1; _j++) {
          field = fields[_j];
          metaModels().push('{{' + name + '.' + field + '}}');
        }
      }
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
      els.preview = $('#MDPreview');
      els.text = $('#textBody');
      els.html = $('#htmlBody');
      return els.preview.html(marked(htmlBody()));
    });
  };
  onTabClick = function(data, event) {
    return $(this).tab('show');
  };
  onPreviewClick = function(data, event) {
    return els.preview.html(marked(htmlBody()));
  };
  onPlaceholderClick = function(data, event) {
    if ($(event.target).attr('rel') === 'htmlBody') {
      return htmlBody(htmlBody() + data);
    } else {
      return textBody(textBody() + data);
    }
  };
  onSaveClick = function(data, event) {
    $('.has-error').removeClass('has-error');
    if (formIsValid()) {
      data = 'bcc=' + bcc();
      data += '&cc' + cc();
      data += '&generateTextBody=' + generateTextBody();
      data += '&htmlBody=' + htmlBody();
      data += '&replyToEmailAddress=' + replyToEmailAddress();
      data += '&sendersName=' + sendersName();
      data += '&subject=' + subject();
      data += '&templateId=' + templateId();
      data += '&templateName=' + templateName();
      data += '&textBody=' + textBody();
      data += '&to=' + to();
      app.resetMessage();
      processing(true);
      return $.ajax({
        url: 'api/email-template/' + templateId(),
        data: data,
        type: 'PUT',
        success: function(res) {
          app.showMessage('Template updated successfully.', 'alert alert-success');
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
    metaModels: metaModels,
    processing: processing,
    init: init,
    onTabClick: onTabClick,
    onPreviewClick: onPreviewClick,
    onPlaceholderClick: onPlaceholderClick,
    onSaveClick: onSaveClick
  };
});
