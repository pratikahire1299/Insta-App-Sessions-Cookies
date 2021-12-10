const  Express =require("express");
const router=Express.Router();

var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
const mongoose=require('mongoose');

uri="mongodb://localhost:27017/Instagram_lite_db";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
                                .then(()=>console.log("Connection Successful: DataBase Name:Instagram_lite_db"))
                                .catch((err)=>console.log("Failed"));



module.exports = router;
