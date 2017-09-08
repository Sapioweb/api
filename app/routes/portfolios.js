var express = require('express');
var router = express.Router();

// Modules
var request = require('request'); // Switch out for axios
var axios = require('axios');

// Models
var Portfolio = require('../models/portfolio');

router.get('/', function (req, res) {
  Portfolio.find(req.query, (err, portfolios) => {
    if (err) throw err;

    res.send({ portfolios });
  });
});

module.exports = router
