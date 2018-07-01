const path = require("path");
const router = require("express").Router();
// const apiRoutes = require("./api");

//encrypt password
var bcrypt = require('bcrypt');
const saltRounds = 10;
// API Routes
// router.use("/api", apiRoutes);

//use passport package

var request = require("request");
var cheerio = require("cheerio");

var db = require("../models");


router.get('/user/all',function(req, res) {
  db.User.findAll({
  }).then(function(data) {
    res.json(data);
  });
});

//load cohort on signup page
router.get('/signup', function (req, res) {
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

//login user
router.post('/user/login', function(req, res) {
  // console.log(req.body);

  db.User.findOne({where:{user_name:req.body.user_name}})
  .then(data =>{
    //if user name exist in database
    if(data){
      var pwd = data.password;
      bcrypt.compare(req.body.password, pwd, function(err, res1) {
        if(res1 == true){
          res.json(data);
        } 
      });
    }
    else
      res.send( "no user")
  })
  .catch(function (err) {
    console.error(err);
  });
  

  //password encryption
  // bcrypt.hash(formData.password, saltRounds, function(err, hash) {
  //   // Store hash in your password DB.
  //   formData.password = hash;
  //   db.User.create(formData);
  // });
});


//chart visulization
router.get('/chart', function (req, res) {
  res.sendFile(path.join(__dirname, "../public/chart.html"));
});

module.exports = router;

