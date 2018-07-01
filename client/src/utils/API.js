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
  getCohortInfo:function(){
    return axios.get("/signup");
  },
  // Deletes the article with the given id
  deleteArticle: function(id) {
    return axios.put("/removeArticle/" + id);
  },
  // Saves a article to the database
  saveArticle: function(id) {
    return axios.put("/saveArticle/"+id);
  },

  createUser:function(obj) {
    return axios({
      method: 'post',
      url: "/user/add",
      data: obj
    }).then(function (response) {
      //handle success
      console.log(response);
    }).catch(function (response) {
      //handle error
      console.log(response);
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
