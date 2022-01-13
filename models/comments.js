const mongoose = require('mongoose');

const Comments = new mongoose.Schema({

  user_id: { type: mongoose.Schema.Types.ObjectId },
  post_id: { type: mongoose.Schema.Types.ObjectId },
  comment: { type: String, default: 'None' },
  lastModifiedDate: { type: Date, default: Date.now },

});

module.exports = mongoose.model('Comments', Comments);
