define(['jquery', 'knockout', '../../../vendor/js/marked', '../../../vendor/js/bootstrap'], function($, ko, marked, bootstrap) {
  'use strict';
  var api, bcc, cc, els, formIsValid, generateTextBody, htmlBody, init, metaModels, onPlaceholderClick, onPreviewClick, onSaveClick, onTabClick, partial, replyToEmailAddress, sendersName, subject, templateName, textBody, title, to;
  title = 'New E-mail Template';
  partial = 'partials/templates/new.html';
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
  templateName = ko.observable();
  textBody = ko.observable();
  to = ko.observable();
  metaModels = ko.observableArray();
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
  init = function(el) {
    var getMetaModels, getPartial, self;
    self = this;
    getPartial = $.get(partial);
    getMetaModels = $.get('api/meta-model');
    return $.when(getPartial, getMetaModels).done(function(mu, mms) {
      var field, fields, m, mm, name, _i, _j, _len, _len1;
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
      app.resetMessage();
      app.updateTitle(title);
      ko.cleanNode(app.els.main[0]);
      app.els.main.empty().html(mu[0]);
      ko.applyBindings(self, app.els.main[0]);
      els.preview = $('#MDPreview');
      els.text = $('#textBody');
      return els.html = $('#htmlBody');
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
      data += '&templateName=' + templateName();
      data += '&textBody=' + textBody();
      data += '&to=' + to();
      app.resetMessage();
      return $.ajax({
        url: 'api/email-template',
        data: data,
        type: 'POST',
        success: function(res) {
          return app.showMessage('Template created successfully.', 'alert alert-success');
        },
        error: function(res) {
          return app.showMessage(res.responseJSON, 'alert alert-danger');
        }
      });
    } else {
      return app.showMessage('Please check all required fields.', 'alert alert-danger');
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
    templateName: templateName,
    textBody: textBody,
    to: to,
    metaModels: metaModels,
    init: init,
    onTabClick: onTabClick,
    onPreviewClick: onPreviewClick,
    onPlaceholderClick: onPlaceholderClick,
    onSaveClick: onSaveClick
  };
});
