const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const routes = require("./routes");
const app = express();
// const router = require("express").Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const PORT = process.env.PORT || 3001;
var db = require("./models");

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     console.log("passport");
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(session({ secret: "catsrule",  resave: false, saveUninitialized: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
// app.set('trust proxy', 1) // trust first proxy

//passport


// passport.serializeUser(function(user_id, done) {
//   done(null, user_id);
// });

// passport.deserializeUser(function(user_id, done) {
//   done(null, user_id);

//   // User.findById(id, function(err, user) {
//   //   done(err, user);
//   // });
// });
  


// Add routes, both API and view
app.use(routes);



db.sequelize.sync().then(function() {  //{ force: true }
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});