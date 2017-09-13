var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('debug', true);

module.exports = mongoose.model('Blog', new Schema({
  title: String,
  author: String,
  pubDate: {
    type: Date,
    default: Date.now
  },
  permaLink: String,
  description: String,
  content: String,
  image: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
  created_at: {
    type: Date,
    default: Date.now
  },
}));
