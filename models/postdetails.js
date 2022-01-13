const mongoose = require('mongoose');

const Postdata = new mongoose.Schema({

  user_id: { type: mongoose.Schema.Types.ObjectId },
  user_name: { type: String, default: 'null' },
  heading: { type: String, default: 'null' },
  description: { type: String, default: 'null' },
  lastModifiedDate: { type: Date, default: Date.now },
  imageOfPost: { type: String },
  like_count: { type: Number, default: 0 },
  likeBy: [{ type: mongoose.Schema.Types.ObjectId, default: 'null' }],
  dislikeBy: [{ type: mongoose.Schema.Types.ObjectId, default: 'null' }],
});

module.exports = mongoose.model('Postdata', Postdata);
