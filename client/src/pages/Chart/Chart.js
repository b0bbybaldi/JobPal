import React ,{ Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import "./Chart.css"

class Chart extends Component {
  constructor(props) {
    super(props);
    // create a ref to store the  DOM element
    this.state = {
      jobs: [],
    };  
  }

  componentDidMount() {
      this.loadJobs();
  }

  loadJobs = () => {
    API.getUserJobs()
      .then(res =>{
        console.log(res.data);
        if(res.data)
          this.setState({ jobs: res.data})
      })
      .catch(err => console.log(err));
  };

  deleteJob = (id) =>{
    API.delUserJob(id)
    .then(res=>{
      console.log(res.data);
      this.loadJobs();
    })
    .catch(err =>console.log(err))
  }


  render() {

      return (
        <Container fluid>
          <Row>
          <Col size="md-12">
            <Jumbotron id="dashJumbo">
              <h3>User charts comparison </h3>
                
            </Jumbotron>
          </Col>
          </Row>
          
        </Container>
      )
  }
}

export default Chart;
