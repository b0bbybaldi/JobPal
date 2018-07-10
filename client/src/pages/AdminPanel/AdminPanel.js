import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
import SignUpBtn from "../../components/SignUpBtn";
import SaveBtn from "../../components/SaveBtn";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Link } from "react-router-dom";
import "./AdminPanel.css"

class AdminPanel extends Component {
  state = {
    users: [],
    cohorts:[],
  };

  componentDidMount() {
    this.loadUser();
    this.loadCohort();
  }

  loadUser() {
    API.getAllUser()
      .then(res =>{
        this.setState({ users: res.data});
        // console.log(res);
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


  render() {
    return (
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
                        {user.user_name}  <br/> 
                        {user.email}  
                        <DeleteBtn onClick={() => this.saveuser(user.id)} />
                      </h6>
                      <span>{user.CohortId}</span>
                    <a href= {user.link}>  {user.link} </a>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>

          <Col size="md-4">
            <h5>Manage Cohorts</h5>
            {this.state.cohorts.length ? (
              <List>
              {this.state.cohorts.map(cohort => (
                <ListItem key={cohort.id}>
                    <h6>
                      {cohort.cohort_name}  <br/> 
                      <SaveBtn onClick={() => this.savecohort(cohort.id)} />
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
            <h5>Compare Cohorts</h5>

            {this.state.cohorts.length ? (
              <List>
                {this.state.cohorts.map(cohort => (
                  <ListItem key={cohort.id}>
                      <h6>
                        {cohort.cohort_name}  <br/> 
                        {cohort.email}  

                        <SaveBtn onClick={() => this.savecohort(cohort.id)} />

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
    );
  }
}

export default AdminPanel;
