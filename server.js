var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');
var config = require('./config');
var Blog = require('./app/models/blog');
var Newsletter = require('./app/models/newsletter');
var Company = require('./app/models/company');
var Portfolio = require('./app/models/portfolio');
var Testimonial = require('./app/models/testimonial');

mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useMongoClient: true });
app.set('superSecret', config.secret); // secret variable

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  res.send('SAPIOWEB API');
});

app.get('/blogs', function (req, res) {
  if (req.query['limit'] != undefined) {
    var queryblogs = Blog.find().limit(parseInt(req.query['limit']));

    queryblogs.exec((err, blogs) => {
      if (err) throw err;

      res.send({ blogs });
    })
  } else {
    Blog.find(req.query, (err, blogs) => {
      if (err) throw err;

      res.send({ blogs });
    });
  }

});

app.get('/blog/:blogId', function (req, res) {
  request({
    url: 'https://api.github.com/gists/' + req.params.blogId,
    headers: {
      'User-Agent': 'sapioweb web app'
    }
  }, (error, response, body) => {
    var jsonResponse = JSON.parse(response.body);

    res.json({jsonResponse});
  });
});

app.get('/newsletters', function (req, res) {
  Newsletter.find(req.query, (err, newsletters) => {
    if (err) throw err;

    res.send({ newsletters });
  });
});

app.get('/portfolios', function (req, res) {
  Portfolio.find(req.query, (err, portfolios) => {
    if (err) throw err;

    res.send({ portfolios });
  });
});

app.get('/testimonials', function (req, res) {
  Testimonial.find(req.query, (err, testimonials) => {
    if (err) throw err;

    res.send({ testimonials });
  });
});

app.get('/companies', function (req, res) {
  Company.find(req.query, (err, companies) => {
    if (err) throw err;

    res.send({ companies });
  });
});

app.get('/fetch/blog', function (req, res) {
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

app.get('/scrape', function (req, res) {
  request({
    url: req.query.link,
    headers: {
      'User-Agent': 'agentOrange'
    }
  }, (error, response, body) => {
    if (error) throw error;

    var $ = cheerio.load(body);

    var company, address, locality, region, zip, phone, link;

    var json = { company : '', address : '', locality : '', region : '', zip : '', phone : '', link: ''};

    $('*[itemprop = "name"]').filter(function(){
      var data = $(this);

      json.company = data.text();
    });

    $('*[itemprop = "street-address"]').filter(function(){
      var data = $(this);

      json.address = data.text();
    });

    $('*[itemprop = "locality"]').filter(function(){
      var data = $(this);

      json.locality = data.text();
    });

    $('*[itemprop = "region"]').filter(function(){
      var data = $(this);

      json.region = data.text();
    });

    $('*[itemprop = "postal-code"]').filter(function(){
      var data = $(this);

      json.zip = data.text();
    });

    $('.ListingDetails_Level2_MAINCONTACT').filter(function(){
      var data = $(this);

      json.phone = data.text().replace(/\s/g,'');
    });

    $('.ListingDetails_Level1_MAINCONTACT').filter(function(){
      var data = $(this);

      json.phone = data.text().replace(/\s/g,'');
    });

    $('*[itemprop = "url"]').filter(function(){
      var data = $(this);

      json.link = data.children().last().attr('href');
    });

    Company.findOneAndUpdate({
      company: json.company
    }, {
      company: json.company,
      address: json.address,
      locality: json.locality,
      region: json.region,
      zip: json.zip,
      phone: json.phone,
      link: json.link
    }, {
      upsert: true
    },function(err) {
      if (err) throw err;

      console.log('Company saved successfully');
    });

    res.json({ url: req.query.link, company: json });
  });


});

app.listen(3001);
