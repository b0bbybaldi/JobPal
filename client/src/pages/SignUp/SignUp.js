import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { BrowserRouter as Router, Route , Switch, Redirect} from "react-router-dom";
import "./SignUp.css";
import swal from "sweetalert"


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

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state.user_name);
    console.log(this.state.email);
    console.log(this.state.password);
    console.log(this.state.CohortId);
    if (this.state.user_name && this.state.email && this.state.password) {
      API.createUser({
        user_name:this.state.user_name,
        email:this.state.email,
        password:this.state.password,
        CohortId:this.state.CohortId
      })
      .then(res => {
          console.log("user created", res.data);
          if(res.data=="user registered") {  //key to rediect
            swal(`Welcome ${this.state.user_name}!`, "", "success");
 
            console.log(res.data);
            this.setState({user:res.data,login:true});
            // window.location.replace("/");
          }
      })
      .catch(err => console.log(err));
    }
    //reset state to intial empty value
    // this.setState({
    //   user_name:"",
    //   email:"",
    //   password:"",
    //   CohortId:"1"
    // });
  };

  render() {
    if(this.state.login ==true){
      return <Redirect to="/Dashboard"/>
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
                    <input onChange={this.handleInputChange} value={this.state.user_name} name="user_name" placeholder="User Name" type="text" className="form-control"/>
                    <br/>
                    <label className ="label-control">Your Email</label>
                    <input onChange={this.handleInputChange} value={this.state.email} name="email" placeholder="Email" type="text" className="form-control"/>
                    <br/>
                    <label className ="label-control">Password (6-12 number or characters)</label>
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
