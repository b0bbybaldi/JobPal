import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { BrowserRouter as  Redirect} from "react-router-dom";
import "./SignUp.css";

class SignUp extends Component {
  state = {
    cohorts: [],
    user_name:"",
    email:"",
    password:"",
    CohortId:"1",
    user:{},
    login:false
  };

  componentDidMount() {
    this.loadCohort();
  }

  loadCohort= () => {
    API.getCohortInfo()
      .then(res =>{
        console.log(res.data);
        this.setState({ cohorts: res.data})
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // validateUserUnique(){
  //   API.findAUserByName(this.state.user_name)
  //   .then(res =>{
  //     console.log(res.data);
  //     if(res.data.id != ""){
  //       console.log(res.data);
  //       return true;
  //     }
  //     else 
  //       return false;
  //   })
   
  // };

  validateEmail = () => {
    var email = this.state.email;
    var regex = /^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$/;
    if(!regex.test(email)){
      return false;
    }
    else
      return true;
  };
  validatePwd = () => {
    var pwd = this.state.password;
    var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/;
    //var regex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}|(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}|(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}|(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[a-z]).{8,}|(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/;
    if(!regex.test(pwd)){
      return false;
    }
    else
      return true;
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state.user_name);
    console.log(this.state.email);
    console.log(this.state.password);
    console.log(this.state.CohortId);
    
    //add user input validation
    if (this.state.user_name.length<6 ||this.state.user_name.length> 20){
      document.getElementById("errorUserName").innerHTML = "(user name need to be between 6-20 charaters)"
    }
    else {
      document.getElementById("errorUserName").innerHTML ="";
    }
    // validate email
    if(this.validateEmail())  
    { 
      document.getElementById("errorEmail").innerHTML ="";
    }
    else{
      document.getElementById("errorEmail").innerHTML ="(Invalid Email)";
    }
    
    if(this.validatePwd()) 
    { 
      document.getElementById("errorPwd").innerHTML ="";
    }
    else{
      document.getElementById("errorPwd").innerHTML ="(Pick a password fit the rules above)";
    }
    
    var frontEndValidated = false;
    if(document.getElementById("errorEmail").innerHTML==="" && document.getElementById("errorUserName").innerHTML ==="" && document.getElementById("errorPwd").innerHTML ==="")
    {  
      frontEndValidated = true;
    }
    if( frontEndValidated === true)
    {
      API.findAUserByName(this.state.user_name)
      .then(res =>{
      console.log(res.data);
      if(res.data !== ""){ // user name already exsit in database
        console.log(res.data);
        document.getElementById("errorUserName").innerHTML ="User Name already exist, pick another name";
      }
      else{ //sign up user
        API.createUser({
          user_name:this.state.user_name,
          email:this.state.email,
          password:this.state.password,
          CohortId:this.state.CohortId
        })
        .then(res => {
            console.log("user created", res.data);
            if(res.data==="user registered") {  //key to rediect
              // swal(`Register complete!`, "login from login page", "success");
              this.setState({user:res.data,login:true});
              console.log(res.data);
              window.location.replace("/Login");
            }
  
        })
        .catch(err => console.log(err));
      }
    })
      
    }
  };

  render() {
    if(this.state.login === true){
      return <Redirect to="/Login"/>
    }
    else{
      return (
        <Container fluid>
          <Row>
            <Col size="md-12">
              <Jumbotron id="signupJumbotron">
                <h3 style={{color:"white",margin:"-2em"}}>Sign Up</h3>
  
                <form id="signupForm">
                  <div className="form-group">
                      <div className="form-group">
                        <label className ="label-control" >Select a Cohort if you belong to any or leave it as general</label>
                        <select className="custom-select" onChange={this.handleInputChange} name="CohortId" >
                          {this.state.cohorts.map(cohort=>(
                            <option value ={cohort.id} key={cohort.id}>{cohort.cohort_name}</option>
                          ))}
                        </select>
                      </div>
                    <label className ="label-control">User Name (unique id you use to log into our website)</label>
                    <label className ="label-control error" id="errorUserName"></label>
                    <input onChange={this.handleInputChange} value={this.state.user_name} name="user_name" placeholder="User Name" type="text" className="form-control"/>
                    <br/>
                    <label className ="label-control">Your Email</label>
                    <label className ="label-control error" id="errorEmail"></label>                    
                    <input onChange={this.handleInputChange} value={this.state.email} name="email" placeholder="Email" type="email" className="form-control"/>
                    <br/>
                    <label className ="label-control">Password (6-12 number & characters at least 1 number & 1 char)</label>
                    <label className ="label-control error" id="errorPwd"></label>                                        
                    <input onChange={this.handleInputChange} value={this.state.password} name="password" placeholder="Password" type="text" className="form-control" id="password"/>
                    <button onClick={this.handleFormSubmit} type="submit" id="signup_btn" className="btn btn-success btn-info submit">Submit</button>
  
                  </div>
                </form>
              </Jumbotron>
            </Col>
          </Row>
          
        </Container>
      )
    }
    
  }
}

export default SignUp;
