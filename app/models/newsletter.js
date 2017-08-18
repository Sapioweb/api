var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('debug', true);

module.exports = mongoose.model('Newsletter', new Schema({
  email: String,
  double_opt: Boolean
}));
