const express = require("express");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const PORT = 5000;
const bcrypt = require("bcrypt");

const dbconnection = require("./DbConnection.js");
const User = require("./models/userdetails");

app.use(cookieParser());
app.use(express.json());
app.use(session({ secret: "gfdtr45MySeceret47uybgdrsj", saveUninitialized: true, resave: true }));

const useer = {
    name: "Ramesh",
    source: "123"
};

// console.log(process.env);
app.post("/login", async (req, res) => {
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

});

app.get("/user", (req, res) => {
    const sessionUser = req.session.user;
    return res.send(sessionUser);
});

app.get("/logout", (req, res) => {
    req.session.destroy();
    return res.send("User logged out!");
});

app.listen(PORT, () => console.log(`Server at ${PORT}`));



