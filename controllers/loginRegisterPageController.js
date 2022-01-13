const Express = require('express');

const router = Express.Router();
require('dotenv').config();
const session = require('express-session');
const cookieParser = require('cookie-parser');

router.use(cookieParser());
const bcrypt = require('bcrypt');

router.use(session({
  secret: process.env.ACCESS_TOKEN_KEY,
  saveUninitialized: true,
  resave: true,
}));

const dbconnection = require('../DbConnection');
const Userdetails = require('../models/userdetails');

exports.register = async (req, res) => {
  try {
    const {
      name, user_name, contact_number, birthdate, password,
    } = req.body;

    if (!(user_name && password)) {
      res.status(400).send('Please Enter Valid Inputs');
    }
    const oldUser = await Userdetails.findOne({ user_name });
    if (oldUser) {
      return res.status(409).send('User Already Exist. Please Login');
    }
    encryptedPassword = await bcrypt.hash(password, 10);
    const user = await Userdetails.create({
      name,
      user_name,
      contact_number,
      birthdate,
      password: encryptedPassword,

    });
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
};
exports.login = async (req, res) => {
  try {
    const { user_name } = req.body;
    const { password } = req.body;
    if (!(user_name && password)) {
      res.status(400).send('Please Enter Valid Inputs');
    }
    const user = await Userdetails.findOne({ user_name });
    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.user = user_name;
      req.session.save();
      // return res.send("User logged in");
      res.status(200).json({ User_Name: user.user_name, Name: user.name });
    } else {
      res.status(400).send('Invalid Credentials || Wrong user_name or password');
    }
  } catch (err) {
    console.log(err);
  }
};

exports.logout = async (req, res) => {
  try {
    req.session.destroy();
    return res.send('User logged out!');
  } catch (err) {
    console.log(err);
  }
};
