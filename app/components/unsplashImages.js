var request = require('request');

// Models
var Image = require('../models/image');

module.exports = function(type, callback) {
  request('https://source.unsplash.com/random/600x400?nature', (error, response, body) => {
    Image.findOneAndUpdate({
      url: response.request.uri.href
    }, {
      url: response.request.uri.href,
      purpose: type,
      created_at: new Date
    }, {
      upsert: true,
      new: true
    },function(err, image) {
      if (err) throw err;

      callback(image);

      console.log('Image saved successfully');
    });
  });
};
