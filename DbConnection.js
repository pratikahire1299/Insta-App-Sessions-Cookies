const Express = require('express');

const router = Express.Router();
const mongo = require('mongodb');

// const { MongoClient } = mongo;
const mongoose = require('mongoose');

uri = 'mongodb://localhost:27017/Instagram_lite_db';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connection Successful: DataBase Name:Instagram_lite_db'))
  .catch((err) => console.log('Failed', err));

module.exports = router;
