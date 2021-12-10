const  Express =require("express");
const router=Express.Router();
require('dotenv').config();
const session = require("express-session");
const cookieParser = require("cookie-parser");
router.use(cookieParser());
const bcrypt = require("bcrypt");
router.use(session({ secret:process.env.ACCESS_TOKEN_KEY , saveUninitialized: true, resave: true }));
const dbconnection = require("../DbConnection.js");
const User = require("../models/userdetails");

exports.getuserdetails=async (req, res,next) => {
    try {
        const sessionUser = req.session.user;
        return res.send(sessionUser);
      } catch (err) {
        console.log(err);
      }

};