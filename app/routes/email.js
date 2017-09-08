var express = require('express');
var router = express.Router();
var config = require('../../config');
var apiKey = config.mailgun.apiKey;
var domain = config.mailgun.domain;
var mailgun = require('mailgun-js')({apiKey: apiKey, domain: domain});

// Modules
var request = require('request'); // Switch out for axios

router.get('/send/:email', function (req, res) {
  var data = {
    from: 'Sapioweb.com <no-reply@sapioweb.com>',
    to: req.params.email,
    subject: req.query.subject,
    text: req.query.text
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });

  res.send(req.query);
});

module.exports = router
