var express = require('express');
var router = express.Router();

// Modules
var request = require('request');
var unsplashImages = require('../components/unsplashImages.js');

// Models
var Blog = require('../models/blog');

router.get('/', function (req, res) {
  if (req.query['limit'] != undefined) {
    var queryblogs = Blog.find({}, null, { sort: { 'created_at': -1 } }).populate('image').limit(parseInt(req.query['limit']));

    queryblogs.exec((err, blogs) => {
      if (err) throw err;

      res.send({ blogs });
    })
  } else {
    Blog.find(req.query).populate('image').sort({ 'created_at': -1 }).exec((err, blogs) => {
      if (err) throw err;

      res.send({ blogs });
    });
  }
});

router.post('/', function (req, res) {
  unsplashImages('blog', function(image) {
    console.log(image);

    req.body.article.image = image.id;
    req.body.article.created_at = new Date;

    Blog.findOneAndUpdate({
      title: req.body.article.title
    }, req.body.article, {
      upsert: true
    },function(err, blog) {
      if (err) throw err;

      res.send({success: true});
    });
  });
});

router.get('/:blogId', function (req, res) {
  Blog.findOne({ '_id': req.params.blogId }, function (err, blog) {
    if (err) throw err;

    res.send({blog});
  });
});

router.get('/fetch', function (req, res) {
  request({
    url: 'https://api.github.com/users/sapiobeasley/gists',
    headers: {
      'User-Agent': 'sapioweb web app'
    }
  }, (error, response, body) => {
    var jsonResponse = JSON.parse(response.body);

    Object.keys(jsonResponse).forEach(function (key) {
      Blog.findOneAndUpdate({
        gist_id: jsonResponse[key]['id']
      }, {
        gist_id: jsonResponse[key]['id'],
        description: jsonResponse[key]['description'],
        gist_created_at: jsonResponse[key]['created_at']
      }, {
        upsert: true
      },function(err) {
        if (err) throw err;

        console.log('Blog saved successfully');
      });
    });

    res.json({ success: true, data: JSON.parse(response.body)});
  });
});

module.exports = router
