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

var request = require("request");
var cheerio = require("cheerio");

const db = require("../models");

// router.use(function(req, res) {
//   res.sendFile(path.join(__dirname, "../client/public/index.html"));
// });

//root / router serve two purpose
router.get('/', function (req, res) {
  console.log(req.user);
  console.log(req.isAuthenticated());
  // res.sendFile(path.join(__dirname, "../client/public/index.html"));
});


// #######user routers 
router.get('/user/all',function(req, res) {
  console.log("URL:",req.path);
  db.User.findAll({
    include: [db.Job]
  }).then(function(data) {
    res.json(data);
  });
});

//delete a certian user
router.delete('/user/:id/delete',function(req,res){
  console.log("URL:",req.path);
  var id = req.params.id;
  db.User.destroy({ where:{id:id}})
  .then(function(data){
    console.log(data);
    res.json(data);
  })
  .catch(function (err) {
    console.error(err);
  });
});



//load cohort on signup page
router.get('/signup', function (req, res) {
  console.log("$$$$$$$$$",req .user);  //extracted from passport deserializeUser
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

// //signup user
// router.post('/user/add', function(req, res) {
//   console.log(req.body);
//   var formData = {
//     user_name: req.body.user_name,
//     email: req.body.email,
//     password: req.body.password,
//     CohortId: req.body.CohortId
//   };
//   //password encryption
//   bcrypt.hash(formData.password, saltRounds, function(err, hash) {
//     // Store hash in your password DB.
//     formData.password = hash;
//     db.User.create(formData);
//   });
// });


//signup user with passport
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
    db.User.create(formData)
    .then(data =>{ //passport auth here
      if(data){
        var user = data.dataValues;
        var user_id = data.dataValues.id;
        var user_name = data.dataValues.user_name;
        console.log(user,user_id,user_name);
        req.login(user,function(err){
          res.send("user registered");
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
});
// passport.deserializeUser(function(user, done) {
//   db.User.findById(user.id)
//   .then(db_user=>{
//     done(null, db_user);
//     }
//   )
// });

//login user
//weird thing happening res.sendFile only works on backend server
router.post("/user/login", passport.authenticate('local',{
    // successRedirect:'/',
    // failureRedirect:'/login'
  }),function(req, res) {
    // console.log("login route print $$$$",req.user);  //extracted from passport deserializeUser
    console.log(req.isAuthenticated());
    login =req.isAuthenticated();
    res.send(login);
    // if(res)
    //   res.send('logged in');
});


//logout user
router.get("/user/logout",function(req, res) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

//send user authtication status back to client every time page refresh,
router.get("/user/checkauth",function(req, res) {
  console.log(req.isAuthenticated());
  res.send(req.isAuthenticated());
});

//check admin status for loading adminpanel
router.get("/admin/checkauth",function(req, res) {
  console.log(req.user);
  res.send(req.user);
});

//########job routes
//get user's jobs from database
router.get('/user/:id/jobs', function(req, res) {
  console.log("get all user jobs$$$$$",req.user);  //extracted from passport deserializeUser
  console.log(req.isAuthenticated());
  // var id = req.params.id;
  // console.log("used for user's jobs",req.user);  //extracted from passport deserializeUser
  var id = req.user.user.id;
  db.Job.findAll({
    include: [db.User],
    where: { UserId: id },
    order: [['updatedAt', 'DESC']]
  }).then(function(data) {
    res.send(data);
    // res.render("../views/user.handlebars", { jobs: data });
  });
});

// add a new job
router.post('/user/addjob', function (req, res) {
  var newjob = req.body;
  var id = req.user.user.id;
  newjob.UserId = id;

  db.Job.create(newjob)
  .then(function(data) {
    res.json(data);
  })
  .catch(function (err) {
    console.error(err);
  });
});

//job card postion rearrange
router.put("/job/:id/update", function(req, res) {
  var id = req.params.id;
  console.log(id);
  var data = req.body;
  console.log(data);

  db.Job.update(
    data,
    { where: { id: id } })
    .then(function(result) {
      console.log(result)
     res.json(result);
    }
  )
})

//job card show or hide
router.put("/job/:id/hide",function(req,res){
  var id = req.params.id;
  console.log(id);
  var data = req.body;
  console.log(data);

  db.Job.update(
     data,
    {where:{id:id}})
  .then(function(result){
    res.json(result);
    }
  )
})

//job note loading
router.get("/job/:id",function(req,res){
  var id = req.params.id;
  console.log(id);
  db.Job.find(
    {where:{id:id}})
  .then(function(result){
    res.json(result);
  })
})

//ger all jobs weird heroku cant hit this route?
//error fixed when lasttime push to heroku was in wrong folder, push in the client folder causing the error
// git notes important check before push the folder is right otherwise wierd error will happen
router.get("/jobs/all",function(req,res){
  console.log("URL:",req.path);
  db.Job.findAll({})
  .then(function(result){
    res.json(result);
  })
  .catch(function (err) {
    console.error(err);
  });
});


//##########data visulization related routes
//this route return all user belongs to a certain cohort
router.get("/cohort/:id/users",function(req,res) {
  console.log("URL:",req.path);
  db.User.findAll({
    where: {
      CohortId: req.params.id
    }
  }).then(function(result) {
    res.json(result);
  });
});

//this route return all job belongs to a certain cohort users
router.get("/cohort/:id/users/jobs",function(req,res) {
   //first call "/api/cohort/:id/users" to get all user belongs to the cohort
   console.log("URL:",req.path);
   db.User.findAll({
    where: {
      CohortId: req.params.id
    }
  })
  .then(function(result) {
    var arrayID = [];
    //define an array to catch all id from the returned obj
    for(var i=0; i< result.length; i++){
      var eachID = result[i].dataValues.id;
      arrayID.push(eachID);
    }
    //or using nick's map method, don't know whether it's a es6 thing or not?
    var result = result.map(function(meow) {return meow.dataValues.id});
    console.log("meow meow id only",result);
    // res.json(result);
    return arrayID;
  })
  .then(function(data) {
    console.log("haha got it",data);
    return db.Job.findAll({
      where: {
        UserId: {$or: data}  //this is the key for a or condition query call to use a array as all the condition fit
      }
    })
  })
  .then(function(result){
      //finnaly result is here , great! I got it now, you can pretty much return whatever we want as wemeow please  hahahhaha
      res.json(result)
  })
    // Handle errors  thanks nick great stacking then method instead of nesting  
  .catch(function(err) {
      console.error(err);
  });

});


//delete a certian cohort
router.delete('/cohort/:id/delete',function(req,res){
  console.log("URL:",req.path);
  var id = req.params.id;
  db.Cohort.destroy({ where:{id:id}})
  .then(function(data){
    console.log(data);
    res.json(data);
  })
  .catch(function (err) {
    console.error(err);
  });
});

//add a cohort  /cohort/add
router.post('/cohort/add', function (req, res) {
  var newcohort = req.body;

  db.Cohort.create(newcohort)
  .then(function(data) {
    res.json(data);
  })
  .catch(function (err) {
    console.error(err);
  });
});
//chart visulization
// router.get('/chart', function (req, res) {
//   res.sendFile(path.join(__dirname, "../client/public/chart.html"));
// });

//find a certian user by name
router.get('/username/:str', function(req, res) {
  var str = req.params.str;
  // console.log("used for user's jobs",req.user);  //extracted from passport deserializeUser
  db.User.find({
    where: { user_name: str },
  }).then(function(data) {
    res.send(data);
    // res.render("../views/user.handlebars", { jobs: data });
  });
});

//find a certian user
router.get('/user/:id', function(req, res) {
  console.log("get this user",req.user);  //extracted from passport deserializeUser
  console.log(req.isAuthenticated());
  // var id = req.params.id;
  // console.log("used for user's jobs",req.user);  //extracted from passport deserializeUser
  var id = req.user.user.id;
  db.User.find({
    where: { id: id },
  }).then(function(data) {
    res.send(data);
    // res.render("../views/user.handlebars", { jobs: data });
  });
});

module.exports = router;

