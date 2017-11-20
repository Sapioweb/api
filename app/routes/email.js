var express = require('express');
var router = express.Router();
var config = require('../../config');
var apiKey = config.mailgun.apiKey;
var domain = config.mailgun.domain;
var mailgun = require('mailgun-js')({apiKey: apiKey, domain: domain});

router.post('/send/:email', function (req, res) {
  var data = {
    from: 'Andreas Beasley <andreas@sapioweb.com>',
    to: req.params.email,
    subject: req.body.subject,
    text: req.body.text
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });

  res.send(req.query);
});

router.post('/roi', function (req, res) {
  var data = {
    from: 'Sapioweb ROI <info@sapioweb.com>',
    to: 'info@sapioweb.com',
    subject: req.body.subject,
    text: req.body.text
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });

  res.send(req.query);
});

router.post('/inquire', function (req, res) {
  var data = {
    from: 'sapioweb.com <info@sapioweb.com>',
    to: 'info@sapioweb.com',
    subject: req.body.subject,
    text: req.body.text
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });

  res.send(req.query);
});

module.exports = router
