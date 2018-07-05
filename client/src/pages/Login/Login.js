import React, { Component } from "react";
import { BrowserRouter as  Redirect} from "react-router-dom";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import "./Login.css"
import swal from "sweetalert"


class Login extends Component {
  state = {
    user_name:"",
    password:"",
    CohortId:"",
    user:{},
    login:false
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
        if(res.data==="logged in") {  //key to rediect 
          swal(`Welcome ${this.state.user_name}!`, "redirect to dashboard", "success");
          console.log(res.data);
          this.setState({user:res.data,login:true});
          window.location.replace("/Dashboard");
        }
      })
      .catch(err => {
        swal("Wrong user name or password", "Login failed! try again", "error");
        console.log(err)
      });
    }
    else{
      swal("fill in both username and password", "Login failed! try again", "warning");

    }
    //reset state to intial empty value
    // this.setState({
    //   user_name:"",
    //   password:"",
    //   CohortId:"1"
    // });
  };

  render() {

    if (this.state.login ===true) {
      // if login success render user dashboard page
     return <Redirect to="/Dashboard"/>
    }
    else{
      // if login failed render login form page
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
              </Jumbotron>
            </Col>
          </Row>
          
        </Container>
      );

    }
    
  }
}

export default Login;
