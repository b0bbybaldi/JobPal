import React ,{ Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import ModalContainer from "../../components/ModalContainer";
import API from "../../utils/API";
import { List, ListItem } from "../../components/List";
import { Link } from "react-router-dom";
import "./Dashboard.css"

class  Dashboard extends Component {
  constructor(props) {
    super(props);
    // create a ref to store the  DOM element
    this.ref = React.createRef();
    this.state = {
      jobs: [],
      user_name:"",
      email:"",
      password:"",
      CohortId:"1",
    };  
  }

  componentDidMount() {
    this.loadJobs();
  }

  refreshPage(){
    this.ref.loadJobs();
  }


  loadJobs = () => {
    API.getUserJobs()
      .then(res =>{
        console.log(res.data);
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

          if(res.data === "user login"){
            window.location.replace("/");
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
    return (
      
      <Container fluid>
        <Row>
        <Col size="md-12">
          <Jumbotron id="dashJumbo">
            <h3>User Dashboard</h3>
        
              {/* {this.state.jobs.length ? ( */}
                <div className="card-deck ">
                  <div className="card">
                    <img className="card-img-top" src="assets/images/applied-icon.png" alt="Card image cap" />
                    <span className="btn" id="newJob">
                      <img className="card-img-overlay" height="80px" src="assets/images/add-icon.png" alt="Add new job" />
                    </span>
                    <div className="card-body">
                      <h4 className="card-title text-center">Applied Jobs</h4>
                      <ul>
                        {this.state.jobs.filter(i => i.loc1 ==true&&i.hide == false).map(job => (
                          <div className="alert alert-info " key={job.id}>
                            <li>
                              <button className="btn card-del delete-btn" onClick={()=>this.deleteJob(job.id)} data-id={job.id} id={`delete${job.id}`}>x</button>
                              <p> {job.job_title}</p>
                              <p> Company: {job.company_name}</p>
                              <p> Link:
                                <a href={job.job_link}>Click here</a>
                              </p>
                              <form id="control" >
                                {/* {{!-- <button type="submit" className="btn btn-primary backbtn" id="back{{id}}" data-loc="1" data-id={{id}}>back</button> --}} */}
                                <button type="submit" className="btn btn-primary nextbtn" id={`next${job.id}`} data-loc="1" data-id={job.id}>next</button>
                              </form>
                            </li>
                          </div>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="card">
                    <img className="card-img-top" src="assets/images/phone-icon.png" alt="Card image cap" />
                    <div className="card-body">
                      <h4 className="card-title text-center">Phone Interview</h4>
                      <ul>
                        {this.state.jobs.filter(i => i.loc2 ==true&&i.hide == false).map(job => (
                          <div className="alert alert-info " key={job.id}>
                            <li>
                              <button className="btn card-del delete-btn" onClick={()=>this.deleteJob(job.id)} data-id={job.id} id={`delete${job.id}`}>x</button>
                              <p> {job.job_title}</p>
                              <p> Company: {job.company_name}</p>
                              <p> Link:
                                <a href={job.job_link}>Click here</a>
                              </p>
                              <form id="control" >
                                <button type="submit" className="btn btn-primary backbtn" id={`back${job.id}`} data-loc="2" data-id={job.id}>back</button>
                                <button type="submit" className="btn btn-primary nextbtn" id={`next${job.id}`} data-loc="2" data-id={job.id}>next</button>
                              </form>
                            </li>
                          </div>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="card">
                    <img className="card-img-top" src="assets/images/on-site-icon.png" alt="Card image cap" />
                    <div className="card-body">
                      <h4 className="card-title text-center">Site Interview</h4>
                      <ul>
                        {this.state.jobs.filter(i => i.loc3 ==true&&i.hide == false).map(job => (
                          <div className="alert alert-info " key={job.id}>
                            <li>
                              <button className="btn card-del delete-btn" onClick={()=>this.deleteJob(job.id)} data-id={job.id} id={`delete${job.id}`}>x</button>

                              <p> {job.job_title}</p>
                              <p> Company: {job.company_name}</p>
                              <p> Link:
                                <a href={job.job_link}>Click here</a>
                              </p>
                              <form id="control" >
                                <button type="submit" className="btn btn-primary backbtn" id={`back${job.id}`} data-loc="3" data-id={job.id}>back</button>
                                <button type="submit" className="btn btn-primary nextbtn" id={`next${job.id}`} data-loc="3" data-id={job.id}>next</button>
                              </form>
                            </li>
                          </div>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="card">
                    <img className="card-img-top" src="assets/images/outcome-icon.png" alt="Card image cap" />
                    <span className="btn" id="trash">
                      {/* <img id= "trashcan" className="card-img-overlay" height="80px" src="assets/images/trashcan.png" alt="Add new job"/> */}
                      <ModalContainer refresh={this.refreshPage}  id="trashCan"/>
                    </span>
                    <div className="card-body">
                      <h4 className="card-title text-center">Offer</h4>
                      <ul>
                        {this.state.jobs.filter(i => i.loc4 ==true&&i.hide == false).map(job => (
                          <div className="alert alert-info " key={job.id}>
                            <li>
                              <button className="btn card-del delete-btn" onClick={()=>this.deleteJob(job.id)} data-id={job.id} id={`delete${job.id}`}>x</button>
                              <p> {job.job_title}</p>
                              <p> Company: {job.company_name}</p>
                              <p> Link:
                                <a href={job.job_link}>Click here</a>
                              </p>
                              <form id="control" >
                                <button type="submit" className="btn btn-primary backbtn" id={`back${job.id}`} data-loc="4" data-id={job.id}>back</button>
                                {/* <button type="submit" className="btn btn-primary nextbtn" id={`next${jsob.id}`} data-loc="4" data-id={job.id}>next</button> */}
                              </form>
                            </li>
                          </div>
                        )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              {/* )
                : (
                  <h3> add jobs</h3>
                )} */}
            </Jumbotron>
          </Col>
        </Row>

        
        {/* <Row>
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
        </Row> */}
        
      </Container>
    );
  }
}

export default Dashboard;
