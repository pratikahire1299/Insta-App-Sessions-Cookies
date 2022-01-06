const Express = require('express');

const router = Express.Router();
require('dotenv').config();
const session = require('express-session');
const cookieParser = require('cookie-parser');

router.use(cookieParser());
const bcrypt = require('bcrypt');

router.use(session({ secret: process.env.ACCESS_TOKEN_KEY, saveUninitialized: true, resave: true }));
const dbconnection = require('../DbConnection.js');
const User = require('../models/userdetails');

exports.register = async (req, res, next) => {
  try {
    const {
      Name, User_Name, Contact_Number, Birthdate, Password,
    } = req.body;
    if (!(User_Name && Password)) {
      res.status(400).send('Please Enter Valid Inputs');
    }
    const oldUser = await User.findOne({ User_Name });
    if (oldUser) {
      return res.status(409).send('User Already Exist. Please Login');
    }
    encryptedPassword = await bcrypt.hash(Password, 10);
    const user = await User.create({
      Name,
      User_Name,
      Contact_Number,
      Birthdate,
      Password: encryptedPassword,

    });
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
};
exports.login = async (req, res, next) => {
  try {
    const { User_Name } = req.body;
    const { Password } = req.body;
    if (!(User_Name && Password)) {
      res.status(400).send('Please Enter Valid Inputs');
    }
    const user = await User.findOne({ User_Name });
    if (user && (await bcrypt.compare(Password, user.Password))) {
      req.session.user = User_Name;
      req.session.save();
      // return res.send("User logged in");
      res.status(200).json({ User_Name: user.User_Name, Name: user.Name });
    } else {
      res.status(400).send('Invalid Credentials || Wrong username or password');
    }
  } catch (err) {
    console.log(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    req.session.destroy();
    return res.send('User logged out!');
  } catch (err) {
    console.log(err);
  }
};
