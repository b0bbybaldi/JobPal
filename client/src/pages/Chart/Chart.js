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
    var initChart = document.getElementById("userChart");
    // ctx.innerHTML= "kjflsfjlsd";
    var myChart = new AChart(initChart, {
      type: 'bar',
      data: {
          labels: ["Applied", "Phone-interview", "On-site interview","Offer"],
          datasets: [{
              label: 'You',
              data: [32, 11, 3, 1],
              backgroundColor: '#6FA0AA',
          },
          {
            label: 'Cohort',
            data: [45, 5, 3, 0.4],
            backgroundColor: '#C38D87',
        },
        {
          label: 'All users',
          data: [42, 5, 2, 0.1],
          backgroundColor: '#A7D48C',

      }
        ],
          
        
        },
        options: {
          title: {
            display: true,
            text: "Student's Job Application Status Compared to Cohort's Average and All Student's Average"
          },
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Job Application Status by Volume'
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
