var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');
var axios = require('axios');
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
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE, PUT");
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

app.delete('/companies', function (req, res) {
  Company.findByIdAndRemove(req.query.company, (err, companies) => {
    if (err) throw err;

    res.send({ companies });
  });
});

app.get('/companies/website', function (req, res) {
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
  axios.get(req.query.link).then( (response) => {
    var $ = cheerio.load(response.data);

    var companyList = [];

    if ($('.ListingResults_All_CONTAINER').length > 0) {
      $('.ListingResults_All_CONTAINER').each((i, elm) => {

        if ($(elm).find('.level2_footer_left_box_a').length == 0) {
          console.log({
            company: $(elm).find('*[itemprop = "name"]').text(),
          });
        }

        companyData = {
          url: 'http://web.tampachamber.com' + $(elm).find('.level1_footer_left_box_a').attr('href') || $(elm).find('.level2_footer_left_box_a').attr('href'),
          company: $(elm).find('*[itemprop = "name"]').text(),
          phone: $(elm).find('.ListingResults_Level1_PHONE1').text() || $(elm).find('.ListingResults_Level1_PHONE2').text() || $(elm).find('.ListingResults_Level2_PHONE1').text(),
          address: $(elm).find('*[itemprop = "street-address"]').text(),
          locality: $(elm).find('*[itemprop = "locality"]').text(),
          region: $(elm).find('*[itemprop = "region"]').text(),
          zip: $(elm).find('*[itemprop = "postal-code"]').text(),
        };

        companyList.push(companyData);

        Company.findOneAndUpdate({
          company: $(elm).find('*[itemprop = "name"]').text()
        }, companyData, {
          upsert: true
        },function(err) {
          if (err) throw err;
        });
      });
    } else {
      $('.ListingDetails_Level1_HEADER').filter((i, elm) => {
        companyData = {
          url: 'http://web.tampachamber.com/no-url',
          company: $(elm).find('*[itemprop = "name"]').text(),
          phone: $(elm).find('.ListingResults_Level1_PHONE1').text() || $(elm).find('.ListingResults_Level1_PHONE2').text() || $(elm).find('.ListingResults_Level2_PHONE1').text() || $(elm).find('.ListingDetails_Level1_MAINCONTACT').text(),
          address: $(elm).find('*[itemprop = "street-address"]').text(),
          locality: $(elm).find('*[itemprop = "locality"]').text(),
          region: $(elm).find('*[itemprop = "region"]').text(),
          zip: $(elm).find('*[itemprop = "postal-code"]').text(),
        };

        companyList.push(companyData);

        Company.findOneAndUpdate({
          company: $(elm).find('*[itemprop = "name"]').text()
        }, companyData, {
          upsert: true
        },function(err) {
          if (err) throw err;
        });
      });

      $('.ListingDetails_Level2_HEADER').filter((i, elm) => {
        companyData = {
          url: 'http://web.tampachamber.com/no-url',
          company: $(elm).find('*[itemprop = "name"]').text(),
          phone: $(elm).find('.ListingResults_Level1_PHONE1').text() || $(elm).find('.ListingResults_Level1_PHONE2').text() || $(elm).find('.ListingResults_Level2_PHONE1').text() || $(elm).find('.ListingDetails_Level1_MAINCONTACT').text() || $(elm).find('.ListingDetails_Level2_MAINCONTACT').text(),
          address: $(elm).find('*[itemprop = "street-address"]').text(),
          locality: $(elm).find('*[itemprop = "locality"]').text(),
          region: $(elm).find('*[itemprop = "region"]').text(),
          zip: $(elm).find('*[itemprop = "postal-code"]').text(),
        };

        companyList.push(companyData);

        Company.findOneAndUpdate({
          company: $(elm).find('*[itemprop = "name"]').text()
        }, companyData, {
          upsert: true
        },function(err) {
          if (err) throw err;
        });
      });
    }

    return companyList;
  }).then((companyList) => {
    res.json(companyList);
  });
});

app.get('/scrape/website', function (req, res) {
  console.log(req.params);
  // Company.find({
  //   link: null,
  //   url: {
  //     $exists : true
  //   }
  // }, (err, companies) => {
  //   if (err) throw err;
  //
  //   for (var i = 0; i < companies.length; i++) {
  //     axios.get(companies[i].url).then((response) => {
  //
  //       console.log($('.ListingDetails_Level2_HEADER').length);
  //
  //       $('.ListingDetails_Level1_HEADER').filter((i, elm) => {
  //
  //         console.log($(elm).find('.ListingDetails_Level1_SITELINK').length);
  //
  //         companyData = {
  //           link: $(elm).find('.ListingDetails_Level1_SITELINK').attr('href')
  //         };
  //
  //         console.log(companyData);
  //       //       companyList.push(companyData);
  //       //
  //       //       Company.findOneAndUpdate({
  //       //         company: $(elm).find('*[itemprop = "name"]').text()
  //       //       }, companyData, {
  //       //         upsert: true
  //       //       },function(err) {
  //       //         if (err) throw err;
  //       //       });
  //       });
  //     });
    // }

    // res.send({ companies });
  // });
  // axios.get(req.query.link).then( (response) => {
  //   var $ = cheerio.load(response.data);
  //
  //   var companyList = [];
  //
  //   if ($('.ListingResults_All_CONTAINER').length > 0) {
  //   } else {

  //   }
  //
  //   return companyList;
  // }).then((companyList) => {
  //   res.json(companyList);
  // });
});

app.listen(3001);
