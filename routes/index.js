const path = require("path");
const router = require("express").Router();
// const apiRoutes = require("./api");

//encrypt password
const bcrypt = require('bcrypt');
const saltRounds = 10;
// API Routes
// router.use("/api", apiRoutes);

//use passport package
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

var request = require("request");
var cheerio = require("cheerio");

const db = require("../models");


//root / router serve two purpose
router.get('/', function (req, res) {
  console.log(req.user);
  console.log(req.isAuthenticated());
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

router.get('/user/all',function(req, res) {
  db.User.findAll({
  }).then(function(data) {
    res.json(data);
  });
});

//load cohort on signup page
router.get('/signup', function (req, res) {
  console.log("$$$$$$$$$",req.user);  //extracted from passport deserializeUser
  console.log(req.isAuthenticated());
  //grab cohorts
  db.Cohort.findAll({})
    .then(function (data) {
      // console.log(res.json(data));
      res.json(data);
    })
    .catch(function (err) {
      console.error(err);
    });
});

//signup user
router.post('/user/add', function(req, res) {
  console.log(req.body);
  var formData = {
    user_name: req.body.user_name,
    email: req.body.email,
    password: req.body.password,
    CohortId: req.body.CohortId
  };
  //password encryption
  bcrypt.hash(formData.password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    formData.password = hash;
    db.User.create(formData);
  });
});


//signup user with passport
router.post('/user/addp', function(req, res) {
  console.log(req.body);
  var formData = {
    user_name: req.body.user_name,
    email: req.body.email,
    password: req.body.password,
    CohortId: req.body.CohortId
  };
  //password encryption
  bcrypt.hash(formData.password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    formData.password = hash;
    db.User.create(formData)
    .then(data =>{ //passport auth here
      if(data){
        var user = data.dataValues;
        var user_id = data.dataValues.id;
        var user_name = data.dataValues.user_name;
        console.log(user,user_id,user_name);
        req.login(user,function(err){
          res.send("user login");
          // res.sendFile(path.join(__dirname, "chart.html"));
        });
      }
      else
        res.send("no user");
    })
    .catch(function (err) {
      console.error(err);
    });
  });
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);

  // User.findById(id, function(err, user) {
  //   done(err, user);
  // });
});


//login user
//weird thing happening res.sendFile only works on backend server
router.post("/user/login", passport.authenticate('local',{
    // successRedirect:'/',
    failureRedirect:'/login'
  }),function(req, res) {
    res.send('logged in');
});


// router.post('/user/login', function(req, res) {
//   // console.log(req.body);

//   db.User.findOne({where:{user_name:req.body.user_name}})
//   .then(data =>{
//     //if user name exist in database
//     if(data){
//       var pwd = data.password;
//       bcrypt.compare(req.body.password, pwd, function(err, res1) {
//         if(res1 == true){
//           res.json(data);
//         } 
//       });
//     }
//     else
//       res.send( "no user")
//   })
//   .catch(function (err) {
//     console.error(err);
//   });
  
// });


//chart visulization
router.get('/chart', function (req, res) {
  res.sendFile(path.join(__dirname, "../client/public/chart.html"));
});

module.exports = router;

