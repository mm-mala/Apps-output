const express = require('express');
const app = express();
const path = require('path');
const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/mongoose-con');
const {generateToken} = require('../utils/generateToken');
const cookieParser = require('cookie-parser');

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(cookieParser());

app.get("/", function(req, res){
  res.render("index");
});

app.post("/", async function(req, res){
  try {
    let { email, username, name, password} = req.body;

    let user = await userModel.findOne({username});
    if(user) return res.status(500).send("User already registered!");

    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(password, salt, async function(err, hash){
        if(err) return res.send(err.message);

        else{
          let createdUser = await userModel.create({
            email: email,
            username: username,
            name: name,
            password: hash
          });

          let token = generateToken(createdUser);
          res.cookie("token", token);
          res.redirect("/register");
        }
      });
    });

  } catch (err) {
    res.send(err.message);
  }
});

app.get("/login", function(req, res){
  res.render("login");
})

app.post("/login", async function(req, res){

  let { email, username, password} = req.body;
  let user = await userModel.findOne({username, email});
  if(!user) return res.status(500).send("Something went wrong!");

  bcrypt.compare(password, user.password, function(err, result){

    if(result){
      let token = jwt.sign({email: email, userid: user._id}, process.env.JWT_KEY);
      res.cookie("token", token);
      res.redirect("/register");
    }
    else res.redirect("/login");

  });
});

app.get("/logout", function(req, res){
  res.clearCookie("token");
  res.redirect("/login");
});

app.get("/register", function(req, res){
  res.render("register");
});

app.post("/register", function(req, res){
  
});

app.get("/today", function(req, res){
  res.render("today");
});

app.get("/tomorrow", function(req, res){
  res.render("tomorrow");
});

app.get("/thisweek", function(req, res){
  res.render("thisweek");
});

app.get("/thismonth", function(req, res){
  res.render("thismonth");
});

app.listen(3000, function(){
  console.log("its running!");
});