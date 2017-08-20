var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('debug', true);

module.exports = mongoose.model('Company', new Schema({
  company: String,
  address: String,
  locality: String,
  region: String,
  zip: String,
  phone: String,
  link: String,
  url: String
}));
