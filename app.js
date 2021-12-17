const Express = require("express");
//const jwt = require("jsonwebtoken");
const session = require("express-session");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const bcrypt = require("bcrypt");
var multer=require('multer');
var upload=multer({dest:'public/uploads/'});


const homepage = require("./routes/homepage.js");
const userdashboard = require("./routes/userdashboard.js");
const userprofile= require("./routes/userprofile.js");
const loginRegister= require("./routes/loginRegisterPage.js");
const auth = require("./Middleware/authentication.js");


const Port = process.env.Port || 5000;


const app = Express();
app.use(Express.json());
app.use(cookieParser());
app.use(Express.json());

app.use(session({ 
     secret:process.env.ACCESS_TOKEN_KEY ,
     saveUninitialized: true,
     resave: true,
    
    }));


app.use('/homepage', homepage);
app.use('/userdashboard', userdashboard);
app.use('/userprofile',userprofile);
app.use('/loginRegisterPage',loginRegister);



app.listen(Port, () => {
  console.log("App Serever Started");
})

module.exports = app;