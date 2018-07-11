import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
// import SignUpBtn from "../../components/SignUpBtn";
import SaveBtn from "../../components/SaveBtn";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import ChartPie from "../../components/Chart";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
// import { Link } from "react-router-dom";

import "./AdminPanel.css"

const spanStyle = {
  color: '#AA0000',
  border: '2px solid #AA0000',
  padding:'5px'
};

class AdminPanel extends Component {
  state = {
    users: [],
    cohorts:[],
    cohort_name:"",
    isAdmin:false
  };

  componentDidMount() {
    this.checkAuthSelf();  //check admin authentication
    this.loadUser();  //load user data
    this.loadCohort(); //load cohort data
  }

  checkAuthSelf(){
    API.checkAuthSelf()
    .then(res =>{
      console.log(res.data)
      if(res.data.user.user_name === "kittykuma")
        this.setState({ isAdmin: true});
    })
    .catch(err => console.log(err));
  }

  loadUser() {
    API.getAllUser()
    .then(res =>{
      this.setState({ users: res.data});
    })
    .catch(err => console.log(err));
  };

  loadCohort = () => {
    API.getCohortInfo()
    .then(res =>{
      this.setState({ cohorts: res.data});
      // console.log(res);
    })
    .catch(err => console.log(err));
  };

  deleteUser(id){
    API.deleteUser(id)
    .then(res =>{
      console.log(res);
      this.loadUser();
    })
    .catch(err => console.log(err));
  }

  deleteCohort(id){
    API.deleteCohort(id)
    .then(res =>{
      console.log(res);
      this.loadCohort();
    })
    .catch(err => console.log(err));
  }

  addCohort(obj){
    API.addCohort(obj)
    .then(res =>{
      console.log(res);
      this.loadCohort();
    })
    .catch(err => console.log(err));
  }


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(this.state.cohort_name);
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state.cohort_name);
    if (this.state.cohort_name) {
      API.addCohort({
        cohort_name:this.state.cohort_name,
      })
      .then(res => {
        this.loadCohort();
      })
      .catch(err => {
        console.log(err)
      });
    }
    else{
      alert("Fill in cohort name to add", "Add cohort failed! try again", "warning");
    }
    this.setState({cohort_name:""})

  };

  render() {
    if(this.state.isAdmin)
    {  return (
        <Container fluid>
          <Row>
            <Col size="md-12">
              <Jumbotron id="adminJumbo">
                <h3>Admin Panel</h3>
              </Jumbotron>
            </Col>
            <Col size="md-4">
              <h5>Manage Users</h5>
              {this.state.users.length ? (
                <List>
                  {this.state.users.map(user => (
                    <ListItem key={user.id}>
                        <h6>
                          Name: {user.user_name} Cohort: {user.CohortId}<br/> 
                          {user.email}  
                          <DeleteBtn onClick={() => this.deleteUser(user.id)} />
                        </h6>
                        {user.Jobs.length?(
                          <span>Jobs applied: {user.Jobs.length}</span>
                        ):(
                          <span style={spanStyle} >Jobs applied: {user.Jobs.length}</span>
                        )}
                        <br/>
                        <span>Registered on : {user.createdAt.slice(0,10)}</span>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <h3>No Results to Display</h3>
              )}
            </Col>

            <Col size="md-4">
              <h5>Manage Cohorts</h5>
              <input onChange={this.handleInputChange} value={this.state.cohort_name} name="cohort_name" placeholder=" New Cohort Name" type="text" id="cohort_name"/>
              <button onClick={this.handleFormSubmit} type="submit" id="addCohort_btn" className="btn btn-success btn-info submit">Add</button>

              {this.state.cohorts.length ? (
                <List>
                {this.state.cohorts.map(cohort => (
                  <ListItem key={cohort.id}>
                      <h6>
                        {cohort.cohort_name}  <br/> 
                        <DeleteBtn onClick={() => this.deleteCohort(cohort.id)} />
                      </h6>
                    <a href= {cohort.link}>  {cohort.link} </a>
                  </ListItem>
                ))}
              </List>
              ) : (
                <h3>No Results to Display</h3>
              )}
            </Col>

            <Col size="md-4">
              <h5>Cohort Statistic</h5>

              {this.state.cohorts.length ? (
                <List>
                  {this.state.cohorts.map(cohort => (
                    <ListItem key={cohort.id}>
                        <h6>
                          {cohort.cohort_name}  <br/> 
                          <ChartPie  id={cohort.cohort_name} value={cohort.id}/>                        

                        </h6>

                        <span>{cohort.CohortId}</span>
                      <a href= {cohort.link}>  {cohort.link} </a>

                    </ListItem>
                  ))}
                </List>
              ) : (
                <h3>No Results to Display</h3>
              )}
            </Col>
          </Row>
        </Container>
      )}
      else
      return  (
        <div>
          <div className= "filler3"> &nbsp; </div>
          <Jumbotron id="adminJumbo"> <h2>No Content, Not authrized</h2> </Jumbotron>
          <div className= "filler3"> &nbsp; </div>

        </div>
      )
  }
}

export default AdminPanel;
