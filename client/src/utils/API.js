import axios from "axios";

export default {
  // Gets all articles
  getArticles: function() {
    return axios.get("/articles");
  },
  gettest: function() {
    return axios.get("/user/all");
  },
  scrapeArticles:function(){
    return axios.get("/scrape");
  },
  // Gets the article with the given id
  getArticle: function(id) {
    return axios.get("/articles/" + id);
  },
  getArticlesSaved: function(id) {
    return axios.get("/saved");
  },
  // Deletes the article with the given id
  deleteArticle: function(id) {
    return axios.put("/removeArticle/" + id);
  },
  // Saves a article to the database
  saveArticle: function(id) {
    return axios.put("/saveArticle/"+id);
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
  checkAuthDash:function() {
    return axios({
      method: 'get',
      url: "/user/checkauthDash",
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
 
  saveNote: function(obj,id) {
    return axios({
      method: 'post',
      url: "/articles/"+id,
      data: obj
    }).then(function (response) {
      //handle success
      console.log(response);
    }).catch(function (response) {
      //handle error
      console.log(response);
    });
  }
};
