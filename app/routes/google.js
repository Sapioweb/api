var express = require('express');
var router = express.Router();
var config = require('../../config');
var request = require('request'),
  throttledRequest = require('throttled-request')(request);

throttledRequest.configure({
  requests: 7,
  milliseconds: 1000
}); //This will throttle the requests so no more than 1 are made every 2 second(s)

router.get('/', function (req, res) {
  res.send('Google API');
});

router.get('/place/:city/keyword/:keyword', function (req, res) {
  var placeids = [];
  var placeDetails = [];
  var pagetoken = '';

  geocode(req.params.city, function (err, geocode) {
    if (err) throw err;

    workPlaces(geocode.body.results[0].geometry.location.lat, geocode.body.results[0].geometry.location.lng, req.params.keyword, pagetoken, function(err, places) {
      if (err) throw err;

      res.send({
        success: true
      });
    });
  });
});

function workPlaces(lat, lng, keyword, pagetoken, callback) {
  placesFunction(lat, lng, keyword, pagetoken, function(err, places) {
    if (err) throw err;

    if (places.body.status === 'OVER_QUERY_LIMIT') {
      throw 'Places API quota reached';
    }

    loopCompanies(places.body.results, keyword, function () {
      if (places.body.next_page_token != undefined) {
        workPlaces(lat, lng, keyword, places.body.next_page_token, callback);
      } else {
        callback();
      }
    });
  });
}

function loopCompanies(results, keyword, callback) {
  results.forEach(function(value, key) {
    details(value.place_id, function (err, details) {
      if (err) throw err;
      var data = {};

      checkDuplicate(details.body.result, keyword, function(err, duplicate, data) {
        if (err) throw err;

        if (!duplicate) {
          addCompany(data, function (err, hubspotCompany) {
            if (err) throw err;
          });
        }
      });
    });
  });

  callback();
}

function checkDuplicate(companyDetails, keyword, callback) {
  if ((companyDetails.website != undefined) && companyDetails.website) {
    throttledRequest({
      url: 'https://api.hubapi.com/companies/v2/domains/' + grabHostname(companyDetails.website) + '/companies?hapikey=' + config.hubspot.key,
      method: 'POST',
      body: {
        "limit": 2,
        "requestOptions": {
          "properties": [
            "domain",
            "createdate",
            "name",
            "hs_lastmodifieddate"
          ]
        },
        "offset": {
          "isPrimary": true,
          "companyId": 0
        }
      },
      json: true
    }, function(err, company) {
      if (err) callback(err);

      data = {
        properties: [{
          name: "domain",
          value: grabHostname(companyDetails.website)
        }]
      };

      if (company.body.results.length > 0) {
        callback(null, true, data);
      } else {
        callback(null, false, data);
      }
    });
  } else {
    data = {
      properties: [{
        name: "name",
        value: companyDetails.name
      },
      {
        name: "phone",
        value: companyDetails.formatted_phone_number
      },
      {
        name: "industry",
        value: keyword
      }]
    };

    callback(null, false, data);
  }
}

function grabHostname(url) {
  var result
  var match

  if (match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)) {
    result = match[1]

    if (match = result.match(/^[^\.]+\.(.+\..+)$/)) {
      result = match[1]
    }
  }

  return result
}

function details(placeId, callback) {
  throttledRequest({
    url: 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + placeId + '&key=' + config.google.key,
    method: 'GET',
    json: true
  }, callback);
}

function addCompany(data, callback) {
  throttledRequest({
    url: 'http://0.0.0.0:3003/hubspot/company',
    body: data,
    method: 'POST',
    json: true
  }, callback);
}

/**
 * Grab nearby companies by an arbitrary location
 * @param  {double}   lat      [description]
 * @param  {double}   lng      [description]
 * @param  {string}   keyword     [description]
 * @param  {Function} callback [description]
 * @return {[keyword]}            [description]
 */
var placesFunction = function places(lat, lng, keyword, pagetoken, callback) {
  var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + lng + '&radius=50000&keyword=' + keyword + '&pagetoken=' + pagetoken + '&key=' + config.google.key;
console.log(url);
  throttledRequest({
    url: url,
    method: 'GET',
    json: true
  }, callback);
}

/**
 * Turn a city name into a lat long
 * @param  {string}   city     Name of the city to geocode
 * @param  {Function} callback What to do after completion
 * @return {[keyword]}            [description]
 */
function geocode(city, callback) {
  throttledRequest({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + city + '&key=' + config.google.key,
    method: 'GET',
    json: true
  }, callback);
}

module.exports = router
