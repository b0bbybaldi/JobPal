import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
import SignUpBtn from "../../components/SignUpBtn";
import SaveBtn from "../../components/SaveBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Link } from "react-router-dom";

import "./Landing.css"
import swal from "sweetalert"

class Landing extends Component {
  state = {
    testing: [],
  };

  componentDidMount() {
    this.signUp();
  }

  signUp = () => {
    API.gettest()
      .then(res =>{
        this.setState({ testing: res.data});
        // console.log(res);
      }
      )
      .catch(err => console.log(err));
  };

  saveArticle = id => {
    API.saveArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  sssignUp = () =>{
    API.scrapeArticles()
      .then(res =>{
        // alert("scrape complete! ");

        swal("Good job!", "scrape complete! ", "success");
        this.loadArticles();
      })
      .catch(err => console.log(err));
  }


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron >
              <h3>Our website supports users throughout the job hunting process by providing task management and data visualization tools.</h3>
              <Link to="/SignUp"><SignUpBtn/>   </Link>
            </Jumbotron>
          </Col>
          <Col size="md-12">

            {this.state.testing.length ? (
              <List>
                {this.state.testing.map(user => (
                  <ListItem key={user.id}>
                      <h4>
                        {user.user_name}  <br/> 
                        {user.email}  

                        <SaveBtn onClick={() => this.saveuser(user.id)} />

                      </h4>

                      <span>{user.CohortId}</span>
                    <a href= {user.link}>  {user.link} </a>
                    {/* <Link to={"/users/" + user._id}>

                    </Link> */}

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

export default Landing;
