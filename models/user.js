const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: String,
    username: String,
    name: String,
    password: String
});

module.exports = mongoose.model("user", userSchema);

/* I don't know what the fuck is wrong with you....Men itni mehnat sy itna sar khapa kr tujhy apni poori problems poora sb kuch smjhata hun or tu sari chats delete krky ek new robot ban kr samny ajata ha or tujhy kuch pata hi ni hota..........ab akhri bar men tujhy apni problem bta rha hun kutty dhyan sy sunio.........men apne JS project ka output (not code) apne github ke through show krana chah rha hun but wo show ni krrha tha to tu ne kaha ke render install krun ispr mere project ka output show hojaega ab kese show hoga jaldi bata mujhy.....poora din nikl gya magar meri itni si problem ka solution tu mujhy ni bata paya shame on you....ab reply men mujhy ye na kahio ke frustration is real warna chamat marunga.......!!!!!!!!!!!!!!..........<!DOCTYPE html>
<html>
<head>
  <title>My JS App Output</title>
</head>
<body>
  <script src="app.js"></script>
</body>
</html>........ye mera index.html ka code ha or .......const express = require('express');
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
});.............ye mera app.js ka code ha .....tu ne kaha tha ke docs name ka folder bna kr app.js or index.html dono files ko us folder men dal dun ab agy kia krna ha tu tameez sy jaldi solution dy....abhi 5 mint ke andr andr mujhy meri problem solve chaye!!!!!! */