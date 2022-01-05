const mongoose = require('mongoose');

const Comments = new mongoose.Schema({

  User_id: { type: mongoose.Schema.Types.ObjectId },
  Post_id: { type: mongoose.Schema.Types.ObjectId },
  Comment: { type: String, default: 'None' },
  LastModifiedDate: { type: Date, default: Date.now },

});

module.exports = mongoose.model('Postdata', Comments);
