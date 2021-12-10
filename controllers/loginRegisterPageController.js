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
exports.login=async (req, res,next) => {
    try {
  
        const User_Name= req.body.User_Name;
        const Password=req.body.Password;
        if (!(User_Name && Password)) {
          res.status(400).send("Please Enter Valid Inputs");
        }
        const user = await User.findOne({ User_Name });
        if (user && (await bcrypt.compare(Password, user.Password))) {
    
            req.session.user = User_Name;
            req.session.save();
            return res.send("User logged in");
        }else{
        res.status(400).send("Invalid Credentials || Wrong username or password");}
      } catch (err) {
        console.log(err);
      }

};
exports.logout=async (req, res,next) => {
    try {
  
        req.session.destroy();
        return res.send("User logged out!");
      } catch (err) {
        console.log(err);
      }

};