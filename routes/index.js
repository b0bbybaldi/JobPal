const path = require("path");
const router = require("express").Router();
// const apiRoutes = require("./api");

// API Routes
// router.use("/api", apiRoutes);

var request = require("request");
var cheerio = require("cheerio");

var db = require("../models");

// cohort routes
router.get('/', function (req, res) {
  // Grab all cohorts to be rendered via a handlebars each
  db.Cohort.findAll({})
    .then(function (data) {
      // grab all the cohorts values off the Sequelize response object 
      // and store them in an array
      var cohorts = data.map(function (cohort) {
        return cohort.dataValues;
      });
      // configure handlebars object
      var hbsObject = {
        cohorts: cohorts
      }
      // console.log(hbsObject);
      // Need to pass the handlebars info to 'each' the cohorts option menu
      res.render( "index", hbsObject);
    })
    // Error handling
    .catch(function (err) {
      console.error(err);
    });
});

router.get('/user/all',function(req, res) {
  db.User.findAll({
  }).then(function(data) {
    res.json(data);
  });
});

router.get('/chart', function (req, res) {
  res.sendFile(path.join(__dirname, "../public/chart.html"));
});

module.exports = router;

