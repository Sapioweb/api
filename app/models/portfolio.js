var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('debug', true);

module.exports = mongoose.model('Portfolio', new Schema({
  title: String,
  content: String,
}));
