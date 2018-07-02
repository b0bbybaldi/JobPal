const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const routes = require("./routes");
const app = express();
// const router = require("express").Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const PORT = process.env.PORT || 3001;
var db = require("./models");


// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(express.static("public"));
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(session({ secret: "catsrule",  resave: false, saveUninitialized: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

// Add routes, both API and view
app.use(routes);

//passport
passport.use(new LocalStrategy(
  {
    usernameField: 'user_name',
    passwordField: 'password'
  },
  function(user_name, password, done) {
    console.log("passport");
    console.log(password); // grab those from the login form with name= "password" automaticly by passport
    console.log(user_name); //same as above

    // compare to info in the database
    db.User.findOne({ where:{user_name: user_name}})
    .then(data =>{
      //if user name exist in database
      if(data){
        var user_id = data.id
        var user_name = data.user_name;
        console.log(user_name);

        //if user name exist in database
        var pwd = data.password;
        bcrypt.compare(password, pwd, function(err, res1) {
          if(res1 == true){
            console.log("logged in");
            return done(null, {user:data});  //this done write user info to the passport serializeUser var named user
          } 
          else{
            console.log("failed wrong password");
            return done(null, false);
          }
        });
      }
      else{
        console.log("failed no such user");
        done(null, false);
      }
    })
    .catch(function (err) {
      console.error(err);
    });
  }
));


db.sequelize.sync().then(function() {  //{ force: true }
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});