const mongoose = require('mongoose');

const User = new mongoose.Schema({
  name: { type: String, default: '' },
  user_name: { type: String, default: '' },
  contact_number: { type: Number, default: 0 },
  birthdate: { type: String, format: 'date' },
  password: { type: String, default: '' },
  profile_image: { type: String, default: 'null' },
});

module.exports = mongoose.model('User', User);
