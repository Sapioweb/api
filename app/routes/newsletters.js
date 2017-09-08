var express = require('express');
var router = express.Router();

// Modules
var request = require('request'); // Switch out for axios
var axios = require('axios');

// Models
var Newsletter = require('../models/newsletter');

router.get('/', function (req, res) {
  Newsletter.find(req.query, (err, newsletters) => {
    if (err) throw err;

    res.send({ newsletters });
  });
});

module.exports = router
