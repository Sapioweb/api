var express = require('express');
var router = express.Router();

// Modules
var request = require('request');
var axios = require('axios');
var cheerio = require('cheerio');

router.get('/', function (req, res) {
//   request({
//   url: 'https://www.manta.com/search?search_source=business&search=' + req.query.search + '&search_location=' + req.query.location + '&pt=' + '28.1203' + ',' + '-82.3529',
//   headers: {
//     'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
//   }
// }, (err, response) => {
//     console.log(response.body);
//     // var $ = cheerio.load(response.data);
//     var companyList = [];
//   //
//   //   if ($('.ListingResults_All_CONTAINER').length > 0) {
//   //     $('.ListingResults_All_CONTAINER').each((i, elm) => {
//   //
//   //       companyData = {
//   //         url: $(elm).find('.level1_footer_left_box_a').attr('href') ? 'http://web.tampachamber.com' + $(elm).find('.level1_footer_left_box_a').attr('href') : 'http://web.tampachamber.com' + $(elm).find('.level2_footer_left_box_a').attr('href'),
//   //         company: $(elm).find('*[itemprop = "name"]').text(),
//   //         phone: $(elm).find('.ListingResults_Level1_PHONE1').text() || $(elm).find('.ListingResults_Level1_PHONE2').text() || $(elm).find('.ListingResults_Level2_PHONE1').text(),
//   //         address: $(elm).find('*[itemprop = "street-address"]').text(),
//   //         locality: $(elm).find('*[itemprop = "locality"]').text(),
//   //         region: $(elm).find('*[itemprop = "region"]').text(),
//   //         zip: $(elm).find('*[itemprop = "postal-code"]').text(),
//   //       };
//   //
//   //       companyList.push(companyData);
//   //
//   //       Company.findOneAndUpdate({
//   //         company: $(elm).find('*[itemprop = "name"]').text()
//   //       }, companyData, {
//   //         upsert: true
//   //       },function(err) {
//   //         if (err) throw err;
//   //       });
//   //     });
//   //   } else {
//   //     $('.ListingDetails_Level1_HEADER').filter((i, elm) => {
//   //       companyData = {
//   //         url: '',
//   //         company: $(elm).find('*[itemprop = "name"]').text(),
//   //         phone: $(elm).find('.ListingResults_Level1_PHONE1').text() || $(elm).find('.ListingResults_Level1_PHONE2').text() || $(elm).find('.ListingResults_Level2_PHONE1').text() || $(elm).find('.ListingDetails_Level1_MAINCONTACT').text(),
//   //         address: $(elm).find('*[itemprop = "street-address"]').text(),
//   //         locality: $(elm).find('*[itemprop = "locality"]').text(),
//   //         region: $(elm).find('*[itemprop = "region"]').text(),
//   //         zip: $(elm).find('*[itemprop = "postal-code"]').text(),
//   //         link: $(elm).find('.ListingDetails_Level1_SITELINK').attr('href')
//   //       };
//   //
//   //       companyList.push(companyData);
//   //
//   //       Company.findOneAndUpdate({
//   //         company: $(elm).find('*[itemprop = "name"]').text()
//   //       }, companyData, {
//   //         upsert: true
//   //       },function(err) {
//   //         if (err) throw err;
//   //       });
//   //     });
//   //
//   //     $('.ListingDetails_Level2_HEADER').filter((i, elm) => {
//   //       companyData = {
//   //         url: '',
//   //         company: $(elm).find('*[itemprop = "name"]').text(),
//   //         phone: $(elm).find('.ListingResults_Level1_PHONE1').text() || $(elm).find('.ListingResults_Level1_PHONE2').text() || $(elm).find('.ListingResults_Level2_PHONE1').text() || $(elm).find('.ListingDetails_Level1_MAINCONTACT').text() || $(elm).find('.ListingDetails_Level2_MAINCONTACT').text(),
//   //         address: $(elm).find('*[itemprop = "street-address"]').text(),
//   //         locality: $(elm).find('*[itemprop = "locality"]').text(),
//   //         region: $(elm).find('*[itemprop = "region"]').text(),
//   //         zip: $(elm).find('*[itemprop = "postal-code"]').text(),
//   //         link: $(elm).find('.ListingDetails_Level2_SITELINK').attr('href')
//   //       };
//   //
//   //       companyList.push(companyData);
//   //
//   //       Company.findOneAndUpdate({
//   //         company: $(elm).find('*[itemprop = "name"]').text()
//   //       }, companyData, {
//   //         upsert: true
//   //       },function(err) {
//   //         if (err) throw err;
//   //       });
//   //     });
//   //   }
//   //
//   //   return companyList;
//   // }).then((companyList) => {
//     res.json(companyList);
//   });

phantom.create().then(function(ph){
    _ph = ph;
    return _ph.createPage();
}).then(function(page){
    _page = page;
    page.setting('userAgent', 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)');

    page.property('viewportSize', {width: 800, height: 600}).then(function() {
    });



    var cookies = page.cookies;

  console.log('Listing cookies:');
  for(var i in cookies) {
    console.log(cookies[i].name + '=' + cookies[i].value);
  }


    return _page.open('https://manta.com/');
}).then(function(status){
    console.log(status);
    return _page.property('content')
}).then(function(content){
    console.log(content);
    _page.close();
    // _ph.exit();
}).catch(function(e){
   console.log(e);
});

res.send('hi');

});

router.get('/website', function (req, res) {
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

router.get('/fetch/news', function (req, res) {
  var feeds = [
    // Working
    axios.get('http://feeds.feedburner.com/unbounce'),
    axios.get('http://feeds.feedburner.com/Minterest'),
    axios.get('http://feeds.feedburner.com/CssTricks'),
    // axios.get('http://feeds.feedburner.com/24ways'),
    // axios.get('http://feeds.feedburner.com/456bereastreet'),
    // axios.get('http://feeds.feedburner.com/JohnResig'),
    // axios.get('http://feeds.feedburner.com/KISSmetrics'),
    // axios.get('http://feeds.feedburner.com/LearningJquery'),
    // axios.get('http://feeds.lifehack.org/Lifehack'),
    // axios.get('https://blog.aweber.com/feed'),
    // axios.get('http://feeds2.feedburner.com/24thfloor'),
    // axios.get('http://feeds2.feedburner.com/tympanus'),
    // axios.get('http://feeds.searchengineland.com/searchengineland'),
    // axios.get('http://feeds.seroundtable.com/SearchEngineRoundtableFull'),
    // axios.get('http://feeds.feedburner.com/blogspot/amDG'),
    // axios.get('http://feeds.feedburner.com/bufferapp'),
    // axios.get('http://feed.onstartups.com/onstartups'),
    // axios.get('http://feeds.feedburner.com/SearchEnginePeople/'),
    // axios.get('http://feeds.feedburner.com/chrisheilmann'),
    // axios.get('http://feeds.feedburner.com/OnlineMarketingSEOBlog'),
    // axios.get('http://feeds.feedburner.com/ProbloggerHelpingBloggersEarnMoney'),
    // axios.get('http://feeds.feedburner.com/Quicksprout'),
    // axios.get('http://feeds.feedburner.com/SixRevisions'),
    // axios.get('http://feeds.feedburner.com/TechCrunch/'),
    // axios.get('http://feeds.feedburner.com/WSwI'),
    // axios.get('http://feeds.feedburner.com/ajaxian'),
    // axios.get('http://feeds.feedburner.com/allTrades'),
    // axios.get('http://feeds.feedburner.com/badassery'),
    // axios.get('http://feeds.feedburner.com/conversationmarketing/mrji'),
    // axios.get('http://feeds.feedburner.com/davidskitchen'),
    // axios.get('http://feeds.feedburner.com/deanedwards/weblog'),
    // axios.get('http://feeds.feedburner.com/digitarald'),
    // axios.get('http://feeds.feedburner.com/dubroy'),
    // axios.get('http://feeds.feedburner.com/jquery/'),
    // axios.get('http://feeds.feedburner.com/leavingworkbehind/'),
    // axios.get('http://feeds.feedburner.com/mootools-blog'),
    // axios.get('http://feeds.feedburner.com/paul-irish'),
    // axios.get('http://feeds.feedburner.com/poshcss'),
    // axios.get('http://feeds.feedburner.com/prototype-blog'),
    // axios.get('http://feeds.feedburner.com/remysharp'),
    // axios.get('http://feeds.feedburner.com/seomoz'),
    // axios.get('http://feeds.feedburner.com/snookca'),
    // axios.get('http://feeds.feedburner.com/viperchill'),
    // axios.get('http://feeds.feedburner.com/youmoz'),
    // axios.get('http://feeds.feedburner.com/zenhabits'),
    // Not working
  ];

  axios.all(feeds).then(axios.spread(function (feed1, feed2, feed3, feed4, feed5, feed6, feed7, feed8, feed9, feed10, feed11, feed12, feed13, feed14, feed15, feed16, feed17, feed18, feed19, feed20, feed21, feed22, feed23, feed124, feed25, feed26, feed27, feed28, feed29, feed30, feed31, feed32, feed33, feed34, feed35, feed36, feed37, feed38, feed39, feed40, feed41, feed42, feed43, feed44, feed45) {
    var items = [];

    function setItems(toParse) {
      var $ = cheerio.load(toParse);

      // Feedburner Parse
      $('item').each((i, elm) => {
        items.push({
          title: $(elm).children('title').text(),
          author: $(elm).parents('channel').children('title').text(),
          pubDate: $(elm).children('pubDate').text(),
          permaLink: $(elm).children('guid').text(),
          description: $(elm).children('description').html(),
          content: $(elm).children('content\\:encoded').html(),
        });
      });

      // $('entry').each((i, elm) => {
      //   items.push({
      //     title: $(elm).children('title').text(),
      //     author: $(elm).parents('feed').children('title').text(),
      //     pubDate: $(elm).children('published').text(),
      //     permaLink: $(elm).children('id').text(),
      //     // description: $(elm).children('description').html(),
      //     content: $(elm).children('content').html(),
      //   });
      // });
    }

    setItems(feed1.data);
    setItems(feed2.data);
    setItems(feed3.data);
    // setItems(feed4.data);
    // setItems(feed5.data);
    // setItems(feed6.data);
    // setItems(feed7.data);
    // setItems(feed8.data);
    // setItems(feed9.data);
    // setItems(feed10.data);
    // setItems(feed11.data);
    // setItems(feed12.data);
    // setItems(feed13.data);
    // setItems(feed14.data);
    // setItems(feed15.data);
    // setItems(feed16.data);
    // setItems(feed17.data);
    // setItems(feed18.data);
    // setItems(feed19.data);
    // setItems(feed20.data);
    // setItems(feed21.data);
    // setItems(feed22.data);
    // setItems(feed23.data);
    // setItems(feed24.data);
    // setItems(feed25.data);
    // setItems(feed26.data);
    // setItems(feed27.data);
    // setItems(feed28.data);
    // setItems(feed29.data);
    // setItems(feed30.data);
    // setItems(feed31.data);
    // setItems(feed32.data);
    // setItems(feed33.data);
    // setItems(feed34.data);
    // setItems(feed35.data);
    // setItems(feed36.data);
    // setItems(feed37.data);
    // setItems(feed38.data);
    // setItems(feed39.data);
    // setItems(feed40.data);
    // setItems(feed41.data);
    // setItems(feed42.data);
    // setItems(feed43.data);
    // setItems(feed44.data);
    // setItems(feed45.data);

    res.send({items});
  }));
});

module.exports = router
