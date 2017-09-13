var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('debug', true);

module.exports = mongoose.model('Image', new Schema({
  url: String,
  purpose: String,
  created_at: {
    type: Date,
    default: Date.now
  },
}));
