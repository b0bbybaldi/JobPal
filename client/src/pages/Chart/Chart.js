import React ,{ Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import AChart from 'chart.js';
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
      this.testing();
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

  testing =() =>{
    var ctx = document.getElementById("userChart");
    // ctx.innerHTML= "kjflsfjlsd";
    var myChart = new AChart(ctx, {
      type: 'bar',
      data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
  }

  render() {

      return (
        <Container fluid>
          <Row>
          <Col size="md-12">
            <Jumbotron >
              <div id="chartJumbo">
                <h3>User charts comparison </h3>
                <canvas id="userChart"></canvas>
              </div>
            </Jumbotron>
          </Col>
          </Row>
          
        </Container>
      )
  }
}

export default Chart;
