import axios from "axios";

export default {
  // Gets all articles
  gettest: function() {
    return axios.get("/user/all").then(function (response) {
      //handle success
      console.log(response);
      return response;})
  },

  getCohortInfo:function(){
    return axios.get("/signup");
  },
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
  findJob:function(id) {
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
