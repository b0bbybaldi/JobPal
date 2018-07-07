import axios from "axios";

export default {
  // Gets all users
  getAllUser: function() {
    return axios.get("/user/all").then(function (response) {
      //handle success
      console.log(response);
      return response;})
  },
    
  // Gets all jobs
  getAllJob: function() {
    return axios.get("/jobs/all").then(function (response) {
      //handle success
      console.log(response);
      return response;})
  },
  //get all job belong to users in certain cohort
  getAllCohortJob: function(cohortID) {
    return axios.get("/cohort/"+cohortID+"/users/jobs").then(function (response) {
      //handle success
      console.log(response);
      return response;})
  },  
  // returns all users in a specific cohort
  getAllCohortUser: function(cohortID) {
    return axios.get("/cohort/"+cohortID+"/users").then(function (response) {
      //handle success
      console.log(response);
      return response;})
  }, 
  //get all cohort name and id
  getCohortInfo:function(){
    return axios.get("/signup");
  },
  //create user
  createUser:function(obj) {
    return axios({
      method: 'post',
      url: "/user/add",
      data: obj
    }).then(function (response) {
      //handle success
      console.log(response);
      return response;
    }).catch(function (response) {
      //handle error
      console.log(response);
      return response;
    });
  },
  //user login
  login:function(obj) {
    return axios({
      method: 'post',
      url: "/user/login",
      data: obj
    }).then(function (response) {
      //handle success
      console.log(response);
      return (response);
    }).catch(function (response) {
      //handle error
      return console.log(response);
    });
  },
  //userlogout
  logout:function() {
    return axios({
      method: 'get',
      url: "/user/logout",
    }).then(function (response) {
      //handle success
      console.log(response);
      return response;
    }).catch(function (err) {
      //handle error
      console.log(err);
      return err;

    });
  },
  //nav bar user auth check for conditional rendering
  checkAuth:function() {
    return axios({
      method: 'get',
      url: "/user/checkauth",
    }).then(function (response) {
      //handle success
      console.log(response);
      return response;
    }).catch(function (response) {
      //handle error
      console.log(response);
      return response;
    });
  },
  //loading jobs to certain user
  getUserJobs:function(id) {
    return axios({
      method: 'get',
      url: "/user/"+id+"/jobs",
    }).then(function (response) {
      //handle success
      console.log(response);
      return (response);
    }).catch(function (response) {
      //handle error
      console.log(response);
      return response;
    });
  },
  //user add a new job
  addUserJob:function(obj) {
    return axios({
      method: 'post',
      url: "/user/addjob",
      data: obj
    }).then(function (response) {
      //handle success
      console.log(response);
      return response;
    }).catch(function (response) {
      //handle error
      console.log(response);
      return response;
    });
  },
  //user update a job
  updateUserJob:function(id,obj) {
    return axios({
      method: 'put',
      url: "/job/"+id+"/update",
      data: obj
    }).then(function (response) {
      //handle success
      console.log(response);
      return response;
    }).catch(function (response) {
      //handle error
      console.log(response);
      return response;
    });
  },
  //user delete(hide) a job
  delUserJob:function(id) {
    return axios({
      method: 'put',
      url: "/job/"+id+"/hide/",
      data: {hide:true}
    }).then(function (response) {
      //handle success
      console.log(response);
      return (response);
    }).catch(function (response) {
      //handle error
      console.log(response);
      return response;
    });
  },
  //user restore a job
  restoreUserJob:function(id) {
    return axios({
      method: 'put',
      url: "/job/"+id+"/hide/",
      data: {hide:false}
    }).then(function (response) {
      //handle success
      console.log(response);
      return (response);
    }).catch(function (response) {
      //handle error
      console.log(response);
      return response;
    });
  },
  //find certain job by id used to load notes in job card
  findAJob:function(id) {
    return axios({
      method: 'get',
      url: "/job/"+id,
    }).then(function (response) {
      //handle success
      console.log(response);
      return (response);
    }).catch(function (err) {
      //handle error
      return console.log(err);
    });
  },
 
};
