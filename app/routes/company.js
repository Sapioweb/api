var express = require('express');
var router = express.Router();
var config = require('../../config');
var request = require('request');

router.get('/:companyId', function (req, res) {
  request({
    url: 'http://0.0.0.0:3003/hubspot/company/' + req.params.companyId,
    method: 'GET',
    json: true
  }, function (err, company) {
    res.json(company.body);
  });
});

router.post('/:companyId/contact', function (req, res) {
  request({
    url: 'https://api.hubapi.com/contacts/v1/contact',
    qs: {
      hapikey: config.hubspot.key
    },
    method: 'post',
    body: {
      properties: [
        {
          property: 'email',
          value: req.body.email
        },
        {
          "property": "firstname",
          value: req.body.firstName
        },
        {
          property: "lastname",
          value: req.body.lastName
        },
        {
          property: "phone",
          value: req.body.phone
        },
      ]
    },
    json: true
  }, function (err, contact) {
    console.log(contact.body);
    request({
      url: 'https://api.hubapi.com/companies/v2/companies/' + req.body.companyId + '/contacts/' + contact.body.vid,
      qs: {
        hapikey: config.hubspot.key
      },
      method: 'POST',
      json: true
    }, function (err, company) {
      res.json(company.body);
    });
  });
});

module.exports = router
