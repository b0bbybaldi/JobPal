import React ,{ Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import API from "../../utils/API";
import AChart from 'chart.js';
import "./Chart.css"
import SaveBtn from "../../components/SaveBtn";

class ChartPie extends Component {
  constructor(props) {
    super(props);
    // create a ref to store the  DOM element
    // this.state = {
    //   jobs: [],
    // };  
  }

  componentDidMount() {
      this.gettingChart(this.props.id,this.props.value);
  }

  gettingChart = (chartID,cohortID) => {

    function gatherData(cohortID){
      console.log("place holder userID and cohortID",cohortID);
  
      var p1 = API.getAllCohortJob(cohortID)
      .then(res =>{
        console.log(res.data);
        return res.data;
      })
      .catch(err => console.log(err));  // returns all jobs in a specefic cohort as an array

      var p0 = API.getAllCohortUser(cohortID)
      .then(res =>{
        console.log(res.data);
        return res.data;
      })
      .catch(err => console.log(err));  // returns all users in a specific cohort as an array
      
      // return Promise.all([p0, p1]);
      return Promise.all([p0, p1]);
    }

    function generateChart(chartID,numUser,numJob){
      var initChart = document.getElementById(chartID);

      new AChart(initChart, {
        // type: 'bar', 
        type: 'pie',
        data: {
            labels: ["Users ", "Jobs", chartID],
            datasets: [{
                label: ["Users ", "Jobs"],
                data: [numUser,numJob,'0.0001'],
                backgroundColor: ['#6FA0AA','#C38D87','#A7D48C']
            },
            {
              label: chartID,
              data: ['0','0','1'],
              backgroundColor: '#A7D48C',
          },

          ],
        },
        options: {
          title: {
            display: true,
            text: "Cohort's number of user and total job applied"
          },
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                },
                scaleLabel: {
                  display: true,
                  // labelString: 'Job Application Status by Volume'
                }
            }]
          }
        }
      });
    }
  
    gatherData(cohortID).then(function (data) {
      var numUser = data[0].length;
      var numJob = data[1].length;

      console.log("total num of jobs:",numJob);   
      generateChart(chartID,numUser, numJob);

    })

  }

  render() {
      return (
        <Container fluid>
          <Row>
            <canvas {...this.props}></canvas>
            <SaveBtn onClick={() => this.gettingChart(this.props.id,this.props.value)}> Update </SaveBtn>
          </Row>
          
        </Container>
      )
  }
}

export default ChartPie;
