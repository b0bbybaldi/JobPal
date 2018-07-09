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
      // this.loadJobs();
      this.gettingChart();
  }

  // loadJobs = () => {
  //   API.getUserJobs()
  //     .then(res =>{
  //       console.log(res.data);
  //       if(res.data)
  //         this.setState({ jobs: res.data})
  //     })
  //     .catch(err => console.log(err));
  // };

  gettingChart = () => {

    function gatherData(){

      var userID = sessionStorage.getItem("userID");
      var cohortID = sessionStorage.getItem("cohortID");
      console.log("place holder userID and cohortID",userID,cohortID);
  
      var p0 = API.getUserJobs()
      .then(res =>{
        console.log(res.data);
        return res.data;
      })
      .catch(err => console.log(err));   //returns specific user's job's data as an array
      
      var p1 = API.getAllJob()
      .then(res =>{
        console.log(res.data);
        return res.data;
      })
      .catch(err => console.log(err));  // returns all jobs in the database as an array
  
      var p2 = API.getAllCohortJob(cohortID)
      .then(res =>{
        console.log(res.data);
        return res.data;
      })
      .catch(err => console.log(err));  // returns all jobs in a specefic cohort as an array
  
      var p3 = API.getAllUser()
      .then(res =>{
        console.log(res.data);
        return res.data;
      })
      .catch(err => console.log(err));  // returns all users in the database as an array
  
      var p4 = API.getAllCohortUser(cohortID)
      .then(res =>{
        console.log(res.data);
        return res.data;
      })
      .catch(err => console.log(err));  // returns all users in a specific cohort as an array
      return Promise.all([p0, p1, p2, p3, p4]);
    }

    function generateChart(sumAppliedUser, sumPhoneUser, sumSiteUser,sumOfferUser, aveAppliedCohort, avePhoneCohort, aveSiteCohort,aveOfferCohort, aveAppliedAll, avePhoneAll, aveSiteAll,aveOfferAll){
      var initChart = document.getElementById("userChart");
      // initChart.innerHTML= "kjflsfjlsd";
      // var myChart = new AChart(initChart, {
      new AChart(initChart, {
        type: 'bar', 
        // type: 'pie',
        data: {
            labels: ["Applied", "Phone-interview", "On-site interview","Offer"],
            datasets: [{
                label: 'You',
                data: [sumAppliedUser, sumPhoneUser, sumSiteUser, sumOfferUser],
                backgroundColor: '#6FA0AA',
            },
            {
              label: 'Cohort',
              data: [aveAppliedCohort, avePhoneCohort, aveSiteCohort, aveOfferCohort],
              backgroundColor: '#C38D87',
          },
          {
            label: 'All users',
            data: [aveAppliedAll, avePhoneAll, aveSiteAll, aveOfferAll],
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
  
    gatherData().then(function (data) {
      var sumAppliedUser = data[0].length;
      var sumPhoneUser = 0;
      var sumSiteUser = 0;
      var sumOfferUser = 0;
      var sumAppliedAll = data[1].length;
      var sumPhoneAll = 0;
      var sumSiteAll = 0;
      var sumOfferAll = 0;
      var sumAppliedCohort = data[2].length;
      var sumPhoneCohort = 0;
      var sumSiteCohort = 0;
      var sumOfferCohort = 0;
      //get the total number of users in cohort and overall users in database 
      var totalUserNumberAll = data[3].length;
      var totalUserNumberCohort = data[4].length;
      
      // extract user data
      for (let i = 0; i < data[0].length; i++) {
  
        if (data[0][i].phone_interview) {
          sumPhoneUser++;
        } 
        if (data[0][i].site_interview) {
          sumSiteUser++;
        }
        if (data[0][i].outcome) {
          sumOfferUser++;
        }
      }
  
      // extract all user data
      for (let i = 0; i < data[1].length; i++) {
  
        if (data[1][i].phone_interview) {
          sumPhoneAll++;
        } 
        if (data[1][i].site_interview) {
          sumSiteAll++;
        }
        if (data[1][i].outcome) {
          sumOfferAll++;
        }
      }
  
      // extract cohort data
      for (let i = 0; i < data[2].length; i++) {
  
        if (data[2][i].phone_interview) {
          sumPhoneCohort++;
        } 
        if (data[2][i].site_interview) {
          sumSiteCohort++;
        }
        if (data[2][i].outcome) {
          sumOfferCohort++;
        }
      }
      console.log("total num of jobs:",sumAppliedAll)
      console.log("total num of users:",totalUserNumberAll)
      //now we average the all user data
      var aveAppliedAll = sumAppliedAll / totalUserNumberAll ;
      var avePhoneAll = sumPhoneAll / totalUserNumberAll ;
      var aveSiteAll = sumSiteAll / totalUserNumberAll ;
      var aveOfferAll = sumOfferAll / totalUserNumberAll 
      var aveAppliedCohort = sumAppliedCohort / totalUserNumberCohort;
      var avePhoneCohort = sumPhoneCohort / totalUserNumberCohort;
      var aveSiteCohort = sumSiteCohort / totalUserNumberCohort;
      var aveOfferCohort = sumOfferCohort / totalUserNumberCohort;
  
      console.log("sumAppliedU", sumAppliedUser)
      console.log("sumphoneU", sumPhoneUser)
      console.log("sumsiteU", sumSiteUser)
      console.log("aveAppliedA", aveAppliedAll)
      console.log("avephoneA", avePhoneAll)
      console.log("avesiteA", aveSiteAll)
      console.log("all data", data)
      // console.log("user", data[0])
      // console.log("all", data[1])
      generateChart(sumAppliedUser, sumPhoneUser, sumSiteUser,sumOfferUser, aveAppliedCohort, avePhoneCohort, aveSiteCohort,aveOfferCohort, aveAppliedAll, avePhoneAll, aveSiteAll,aveOfferAll);

    })

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
