import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import "./Login.css"


class Login extends Component {
  state = {
    user_name:"",
    password:"",
    CohortId:""
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    console.log("sth")
    // API.getArticlesSaved()
    //   .then(res =>
    //     this.setState({ articles: res.data})
    //   )
    //   .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(this.state.user_name);
    console.log(this.state.password);
    // console.log(this.state.CohortId);
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state.user_name);
    console.log(this.state.password);
    if (this.state.user_name && this.state.password) {
      API.login({
        user_name:this.state.user_name,
        password:this.state.password,
      })
      .then(res => {
        if(res) {
          console.log(res.data);
          // window.location.replace("/");
        }
      })
      .catch(err => console.log(err));
    }
    else{
      alert("invalide username and password");
    }
    //reset state to intial empty value
    this.setState({
      user_name:"",
      password:"",
      CohortId:"1"
    });
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron id="signupJumbotron">
              <h3 style={{color:"white",margin:"-2em"}}>Log In</h3>

              <form id="loginForm">
                <div className="form-group">

                  <label className ="label-control">User Name (unique id you use to log into our website)</label>
                  <input onChange={this.handleInputChange} value={this.state.user_name} name="user_name" placeholder="User Name" type="text" className="form-control" id="user_name"/>
                  <br/>

                  <label className ="label-control">Password (6-12 number or characters)</label>
                  <input onChange={this.handleInputChange} value={this.state.password} name="password" placeholder="Password" type="password" className="form-control" id="password"/>
                  <button onClick={this.handleFormSubmit} type="submit" id="signup_btn" className="btn btn-success btn-info submit">Submit</button>

                </div>
						  </form>

              {/* <form action="/login" method="post">
                  <div>
                      <label>Username:</label>
                      <input type="text" name="username"/>
                  </div>
                  <div>
                      <label>Password:</label>
                      <input type="password" name="password"/>
                  </div>
                  <div>
                      <input type="submit" value="Log In"/>
                  </div>
              </form> */}
            </Jumbotron>
          </Col>
          {/* <Col size="sm-12">

            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <h4>
                      {article.title}  
                      <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                    </h4>
                    <span>{article.summary}</span>
                    <a href= {article.link}>  {article.link} </a>
                    <br/>
                    <ModalContainer id={article._id} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>Meow Meow, nothing saved</h3>
            )}
          </Col> */}
        </Row>
        
      </Container>
    );
  }
}

export default Login;
