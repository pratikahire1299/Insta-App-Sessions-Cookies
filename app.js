const Express = require('express');

const session = require('express-session');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const multer = require('multer');

multer({ dest: 'public/uploads/' });

const homepage = require('./routes/homepage');
const userdashboard = require('./routes/userdashboard');
const userprofile = require('./routes/userprofile');
const loginRegister = require('./routes/loginRegisterPage');

const Port = process.env.Port || 7000;

const app = Express();
app.use(Express.json());
app.use(cookieParser());
app.use(Express.json());

app.use(session({
  secret: process.env.ACCESS_TOKEN_KEY,
  saveUninitialized: true,
  resave: true,

}));

app.use('/homepage', homepage);
app.use('/userdashboard', userdashboard);
app.use('/userprofile', userprofile);
app.use('/loginRegisterPage', loginRegister);

app.listen(Port, () => {
  console.log('App Serever Started At ', Port);
});

module.exports = app;
