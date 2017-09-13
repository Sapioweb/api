var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config');

// Routes
var blogs = require('./app/routes/blogs');
var companies = require('./app/routes/companies');
var newsletters = require('./app/routes/newsletters');
var portfolios = require('./app/routes/portfolios');
var testimonials = require('./app/routes/testimonials');
var scrape = require('./app/routes/scrape');
var email = require('./app/routes/email');

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
app.use('/blogs', blogs);
app.use('/companies', companies);
app.use('/newsletters', newsletters);
app.use('/portfolios', portfolios);
app.use('/testimonials', testimonials);
app.use('/scrape', scrape);
app.use('/email', email);

app.listen(3003);
