import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
import SignUpBtn from "../../components/SignUpBtn";
import Jumbotron from "../../components/Jumbotron";
// import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { Link } from "react-router-dom";
import "./Landing.css"

class Landing extends Component {
  state = {
    testing: [],
  };

  // componentDidMount() {
  //   this.signUp();
  // }

  // signUp = () => {
  //   API.getAllUser()
  //     .then(res =>{
  //       this.setState({ testing: res.data});
  //       // console.log(res);
  //     }
  //     )
  //     .catch(err => console.log(err));
  // };


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

          <div className="card-deck">
            <div className="card">
              <img className="card-img-top" src="assets/images/icon101.png" alt="Card cap"/>
              <div className="card-body">
                <h4 className="card-title text-center">Efficiency</h4>
                <p className="card-text">Track applications along each stage of the interview process. See which jobs you're waiting to hear back from, and move them through the process towards final outcome.</p>
              </div>
              <div className="card-footer">
              </div>
            </div>
            <div className="card">
              <img className="card-img-top" src="assets/images/icon102.png" alt="Card cap"/>
              <div className="card-body">
                <h4 className="card-title text-center">Comparison</h4>
                <p className="card-text">Gain insights on your job hunting process. Use the data to assess where you can improve according to the data of other users.</p>
              </div>
              <div className="card-footer">
              </div>
            </div>
            <div className="card">
              <img className="card-img-top" src="assets/images/icon103.png" alt="Card cap"/>
              <div className="card-body">
                <h4 className="card-title text-center">Results</h4>
                <p className="card-text">Know where you stand with each application. Compare your results to all user results and averages. Realize opportunities and improve outcomes.</p>
              </div>
              <div className="card-footer">
              </div>
            </div>
          </div>
        </Row>
      </Container>
    );
  }
}

export default Landing;
