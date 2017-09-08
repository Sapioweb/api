var express = require('express');
var router = express.Router();

// Modules
var request = require('request'); // Switch out for axios
var axios = require('axios');

// Models
var Testimonial = require('../models/testimonial');

router.get('/', function (req, res) {
  Testimonial.find(req.query, (err, testimonials) => {
    if (err) throw err;

    res.send({ testimonials });
  });
});

module.exports = router
