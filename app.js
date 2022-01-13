const Express = require('express');

const session = require('express-session');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const multer = require('multer');

multer({ dest: 'public/uploads/' });

const homepage = require('./routes/homePage');
const userdashboard = require('./routes/userDashboard');
const userprofile = require('./routes/userProfile');
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

app.use('/homePage', homepage);
app.use('/userDashboard', userdashboard);
app.use('/userProfile', userprofile);
app.use('/loginRegisterPage', loginRegister);

app.listen(Port, () => {
  console.log('App Serever Started At ', Port);
});

module.exports = app;
