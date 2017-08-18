var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('debug', true);

module.exports = mongoose.model('Testimonial', new Schema({
  from: String,
  content: String,
}));
