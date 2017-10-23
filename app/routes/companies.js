var express = require('express');
var router = express.Router();

// Modules
var request = require('request'); // Switch out for axios
var axios = require('axios');
var cheerio = require('cheerio');

// Models
var Company = require('../models/company');

router.get('/', function (req, res) {
  Company.find(req.query, null, { sort: { '_id': -1 } }, (err, companies) => {
    if (err) throw err;

    res.send({ companies });
  });
});

router.delete('/', function (req, res) {
  Company.findByIdAndRemove(req.query.company, (err, companies) => {
    if (err) throw err;

    res.send({ companies });
  });
});

router.get('/website', function (req, res) {
  Company.findOne({_id: req.query.company}, (err, company) => {
    axios.get(company.url).then((response) => {
      var $ = cheerio.load(response.data);

      $('.ListingDetails_Level1_HEADERBOX').filter((i, elm) => {
        company.link = $(elm).find('.ListingDetails_Level1_SITELINK').attr('href');

        Company.findOneAndUpdate({
          _id: company._id
        }, company, {
          upsert: true
        },function(err) {
          if (err) throw err;
        });

        res.send({company});
      });
    });
  });
});

router.get('/', function (req, res) {
  // Discover companies
  res.send('Discover Companies');
});

module.exports = router
