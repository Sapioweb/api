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

// {
//   "portalId":3866779,
//   "companyId":575297747,
//   "isDeleted":false,
//   "properties":{
//     "zip":{
//       "value":"72032",
//       "timestamp":1508100189504,
//       "source":"BIDEN",
//       "sourceId":"BidenPropertyMappings",
//       "versions":[{
//         "name":"zip",
//         "value":"72032",
//         "timestamp":1508100189504,
//         "sourceId":"BidenPropertyMappings",
//         "source":"BIDEN",
//         "sourceVid":[]
//       }]
//     },
//     "country":{
//       "value":"United States",
//       "timestamp":1508100189504,
//       "source":"BIDEN",
//       "sourceId":"BidenPropertyMappings",
//       "versions":[{
//         "name":"country",
//         "value":"United States",
//         "timestamp":1508100189504,
//         "sourceId":"BidenPropertyMappings",
//         "source":"BIDEN",
//         "sourceVid":[]
//       }]
//     },
//     "website":{
//       "value":"my100bank.com",
//       "timestamp":1508100189288,
//       "source":"CALCULATED",
//       "sourceId":null,
//       "versions":[{
//         "name":"website",
//         "value":"my100bank.com",
//         "timestamp":1508100189288,
//         "source":"CALCULATED",
//         "sourceVid":[]
//       }]
//     },
//     "address":{
//       "value":"620 Chestnut Street",
//       "timestamp":1508100189504,
//       "source":"BIDEN",
//       "sourceId":"BidenPropertyMappings",
//       "versions":[{
//         "name":"address",
//         "value":"620 Chestnut Street",
//         "timestamp":1508100189504,
//         "sourceId":"BidenPropertyMappings",
//         "source":"BIDEN",
//         "sourceVid":[]
//       }]
//     },
//     "city":{
//       "value":"Conway",
//       "timestamp":1508100189504,
//       "source":"BIDEN",
//       "sourceId":"BidenPropertyMappings",
//       "versions":[{
//         "name":"city",
//         "value":"Conway",
//         "timestamp":1508100189504,
//         "sourceId":"BidenPropertyMappings",
//         "source":"BIDEN",
//         "sourceVid":[]
//       }]
//     },
//     "timezone":{
//       "value":"America/Chicago",
//       "timestamp":1508100189504,
//       "source":"BIDEN",
//       "sourceId":"BidenPropertyMappings",
//       "versions":[{
//         "name":"timezone",
//         "value":"America/Chicago",
//         "timestamp":1508100189504,
//         "sourceId":"BidenPropertyMappings",
//         "source":"BIDEN",
//         "sourceVid":[]
//       }]
//     },
//     "facebook_company_page":{
//       "value":"http://www.facebook.com/my100bank",
//       "timestamp":1508100189504,
//       "source":"BIDEN",
//       "sourceId":"BidenPropertyMappings",
//       "versions":[{
//         "name":"facebook_company_page",
//         "value":"http://www.facebook.com/my100bank",
//         "timestamp":1508100189504,
//         "sourceId":"BidenPropertyMappings",
//         "source":"BIDEN",
//         "sourceVid":[]
//       }]
//     },
//     "createdate":{
//       "value":"1508100189288",
//       "timestamp":1508100189288,
//       "source":"API",
//       "sourceId":"API",
//       "versions":[{
//         "name":"createdate",
//         "value":"1508100189288",
//         "timestamp":1508100189288,
//         "sourceId":"API",
//         "source":"API",
//         "sourceVid":[]
//       }]
//     },
//     "description":{
//       "value":"Your onestop shop for Free Business & Personal Checking, High Yield Savings & Investments, CDs, IRAs, Personal & Home Mortgage Loans, and so much MORE! Check out our brand new site & start loving your new bank today!",
//       "timestamp":1508100189504,
//       "source":"BIDEN",
//       "sourceId":"BidenPropertyMappings",
//       "versions":[{
//         "name":"description",
//         "value":"Your onestop shop for Free Business & Personal Checking, High Yield Savings & Investments, CDs, IRAs, Personal & Home Mortgage Loans, and so much MORE! Check out our brand new site & start loving your new bank today!",
//         "timestamp":1508100189504,
//         "sourceId":"BidenPropertyMappings",
//         "source":"BIDEN",
//         "sourceVid":[]
//       }]
//     },
//     "industry":{
//       "value":"BANKING",
//       "timestamp":1508100189504,
//       "source":"BIDEN",
//       "sourceId":"BidenPropertyMappings",
//       "versions":[{
//         "name":"industry",
//         "value":"BANKING",
//         "timestamp":1508100189504,
//         "sourceId":"BidenPropertyMappings",
//         "source":"BIDEN",
//         "sourceVid":[]
//       }]
//     },
//     "web_technologies":{
//       "value":"youtube;linode_hosting;microsoft_office_365;nginx;facebook_connect;ultipro;google_analytics;twitter_button;wufoo;facebook_advertiser",
//       "timestamp":1508100189504,
//       "source":"BIDEN",
//       "sourceId":"BidenPropertyMappings",
//       "versions":[{
//         "name":"web_technologies",
//         "value":"youtube;linode_hosting;microsoft_office_365;nginx;facebook_connect;ultipro;google_analytics;twitter_button;wufoo;facebook_advertiser",
//         "timestamp":1508100189504,
//         "sourceId":"BidenPropertyMappings",
//         "source":"BIDEN",
//         "sourceVid":[]
//       }]
//     },
//     "linkedin_company_page":{
//       "value":"https://www.linkedin.com/company/centennial-bank_2",
//       "timestamp":1508100189504,
//       "source":"BIDEN",
//       "sourceId":"BidenPropertyMappings",
//       "versions":[{
//         "name":"linkedin_company_page",
//         "value":"https://www.linkedin.com/company/centennial-bank_2",
//         "timestamp":1508100189504,
//         "sourceId":"BidenPropertyMappings",
//         "source":"BIDEN",
//         "sourceVid":[]
//       }]
//     },
//     "twitterhandle":{
//       "value":"MY100BANK",
//       "timestamp":1508100189504,
//       "source":"BIDEN",
//       "sourceId":"BidenPropertyMappings",
//       "versions":[{
//         "name":"twitterhandle",
//         "value":"MY100BANK",
//         "timestamp":1508100189504,
//         "sourceId":"BidenPropertyMappings",
//         "source":"BIDEN",
//         "sourceVid":[]
//       }]
//     },
//     "hs_lastmodifieddate":{
//       "value":"1508100189543",
//       "timestamp":1508100189543,
//       "source":"CALCULATED",
//       "sourceId":null,
//       "versions":[{
//         "name":"hs_lastmodifieddate",
//         "value":"1508100189543",
//         "timestamp":1508100189543,
//         "source":"CALCULATED",
//         "sourceVid":[]
//       }]
//     },
//     "phone":{
//       "value":"+1 888-372-9788",
//       "timestamp":1508100189504,
//       "source":"BIDEN",
//       "sourceId":"BidenPropertyMappings",
//       "versions":[{
//         "name":"phone",
//         "value":"+1 888-372-9788",
//         "timestamp":1508100189504,
//         "sourceId":"BidenPropertyMappings",
//         "source":"BIDEN",
//         "sourceVid":[]
//       }]
//     },
//     "annualrevenue":{
//       "value":"500000000",
//       "timestamp":1508100189504,
//       "source":"BIDEN",
//       "sourceId":"BidenPropertyMappings",
//       "versions":[{
//         "name":"annualrevenue",
//         "value":"500000000",
//         "timestamp":1508100189504,
//         "sourceId":"BidenPropertyMappings",
//         "source":"BIDEN",
//         "sourceVid":[]
//       }]
//     },
//     "domain":{
//       "value":"my100bank.com",
//       "timestamp":1508100189288,
//       "source":"API",
//       "sourceId":null,
//       "versions":[{
//         "name":"domain",
//         "value":"my100bank.com",
//         "timestamp":1508100189288,
//         "source":"API",
//         "sourceVid":[]
//       }]
//     },
//     "founded_year":{
//       "value":"1999",
//       "timestamp":1508100189504,
//       "source":"BIDEN",
//       "sourceId":"BidenPropertyMappings",
//       "versions":[{
//         "name":"founded_year",
//         "value":"1999",
//         "timestamp":1508100189504,
//         "sourceId":"BidenPropertyMappings",
//         "source":"BIDEN",
//         "sourceVid":[]
//       }]
//     },
//     "is_public":{
//       "value":"true",
//       "timestamp":1508100189504,
//       "source":"BIDEN",
//       "sourceId":"BidenPropertyMappings",
//       "versions":[{
//         "name":"is_public",
//         "value":"true",
//         "timestamp":1508100189504,
//         "sourceId":"BidenPropertyMappings",
//         "source":"BIDEN",
//         "sourceVid":[]
//       }]
//     },
//     "name":{
//       "value":"Centennial Bank",
//       "timestamp":1508100189504,
//       "source":"BIDEN",
//       "sourceId":"BidenPropertyMappings",
//       "versions":[{
//         "name":"name",
//         "value":"Centennial Bank",
//         "timestamp":1508100189504,
//         "sourceId":"BidenPropertyMappings",
//         "source":"BIDEN",
//         "sourceVid":[]
//       }]
//     },
//     "state":{
//       "value":"AR",
//       "timestamp":1508100189504,
//       "source":"BIDEN",
//       "sourceId":"BidenPropertyMappings",
//       "versions":[{
//         "name":"state",
//         "value":"AR",
//         "timestamp":1508100189504,
//         "sourceId":"BidenPropertyMappings",
//         "source":"BIDEN",
//         "sourceVid":[]
//       }]
//     },
//     "linkedinbio":{
//       "value":"Your onestop shop for Free Business & Personal Checking, High Yield Savings & Investments, CDs, IRAs, Personal & Home Mortgage Loans, and so much MORE! Check out our brand new site & start loving your new bank today!",
//       "timestamp":1508100189504,
//       "source":"BIDEN",
//       "sourceId":"BidenPropertyMappings",
//       "versions":[{
//         "name":"linkedinbio",
//         "value":"Your onestop shop for Free Business & Personal Checking, High Yield Savings & Investments, CDs, IRAs, Personal & Home Mortgage Loans, and so much MORE! Check out our brand new site & start loving your new bank today!",
//         "timestamp":1508100189504,
//         "sourceId":"BidenPropertyMappings",
//         "source":"BIDEN",
//         "sourceVid":[]
//       }]
//     }
//   },
//   "additionalDomains":[],
//   "stateChanges":[],
//   "mergeAudits":[]
// }
