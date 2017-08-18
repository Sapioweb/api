var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('debug', true);

module.exports = mongoose.model('Blog', new Schema({
  gist_id: String,
  description: String,
  gist_created_at: {
    type: Date,
    default: Date.now
  },
}));
