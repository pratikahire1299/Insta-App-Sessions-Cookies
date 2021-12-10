const express = require("express");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const PORT = 5000;
const bcrypt = require("bcrypt");
require('dotenv').config();
const dbconnection = require("./DbConnection.js");
const User = require("./models/userdetails");
const loginRegisterPage=require("./routes/loginRegisterPage.js");
const userprofile=require("./routes/userprofile.js");
app.use(cookieParser());
app.use(express.json());
app.use(session({ secret:process.env.ACCESS_TOKEN_KEY , saveUninitialized: true, resave: true }));


// console.log(process.env);
app.use("/loginRegisterPage",loginRegisterPage);
app.use("/userprofile",userprofile);
 

app.listen(PORT, () => console.log(`Server at ${PORT}`));



