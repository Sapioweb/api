var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../../config');

var hubspotApi = 'https://api.hubapi.com/companies/v2';

router.post('/company', function (req, res) {
  var options = {
    method: 'POST',
    url: 'https://api.hubapi.com/companies/v2/companies',
    qs: {
      hapikey: config.hubspot.key
    },
    headers: {
      'content-type': 'application/json'
    },
    body: req.body,
    json: true
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    res.send(body);
  });
});

router.get('/company/:id', function (req, res) {
  var options = {
    method: 'GET',
    url: 'https://api.hubapi.com/companies/v2/companies/' + req.params.id,
    qs: {
      hapikey: config.hubspot.key
    },
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    res.send(body);
  });
});

module.exports = router
