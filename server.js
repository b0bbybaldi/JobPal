const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const app = express();
// const router = require("express").Router();

// var db = require("./models");  // this is for the routes directly in server.js file

const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(express.static("public"));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);


// Connect to the Mongo DB
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines",
//   {
//     useMongoClient: true
//   }
// );

// Start the API server
// app.listen(PORT, function () {
//   console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
// });
var db = require("./models");


db.sequelize.sync().then(function() {  //{ force: true }
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});