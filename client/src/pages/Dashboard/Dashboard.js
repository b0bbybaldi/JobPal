import React ,{ Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { List, ListItem } from "../../components/List";
import { Link } from "react-router-dom";
import "./Dashboard.css"

class  Dashboard extends Component {
  state = {
    jobs: [],
    user_name:"",
    email:"",
    password:"",
    CohortId:"1",
  };

  componentDidMount() {
    this.loadJobs();
  }

  loadJobs = () => {
    API.getUserJobs()
      .then(res =>{
        console.log(res.data);
        this.setState({ jobs: res.data})
      })
      .catch(err => console.log(err));
  };

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
           {/*  <h1>
              <span role="img" aria-label="Face With Rolling Eyes Emoji">
                🙄
              </span>
            </h1> */}
          
        
              {this.state.jobs.length ? (
                <div className="card-deck">
                  <div className="card">
                    <img className="card-img-top" src="assets/images/applied-icon.png" alt="Card image cap" />
                    <span className="btn" id="newJob">
                      <img className="card-img-overlay" height="80px" src="assets/images/add-icon.png" alt="Add new job" />
                    </span>
                    <div className="card-body">
                      <h4 className="card-title text-center">Applied Jobs</h4>
                      <ul>
                        {this.state.jobs.filter(i => i.loc1 ==true&&i.hide == false).map(job => (
                          <div className="alert alert-info ">
                            <li>
                              <button className="btn card-del delete-btn"  data-id={job.id} id={`delete${job.id}`}>x</button>
                              <p> Title: {job.job_title}</p>
                              <p> Company: {job.company_name}</p>
                              <p> Link:
                                <a href={job.job_link}>{job.job_link}</a>
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
                          <div className="alert alert-info ">
                            <li>
                              <button className="btn card-del delete-btn"  data-id={job.id} id={`delete${job.id}`}>x</button>
                              <p> Title: {job.job_title}</p>
                              <p> Company: {job.company_name}</p>
                              <p> Link:
                                <a href={job.job_link}>{job.job_link}</a>
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
                          <div className="alert alert-info ">
                            <li>
                              <button className="btn card-del delete-btn"  data-id={job.id} id={`delete${job.id}`}>x</button>

                              <p> Title: {job.job_title}</p>
                              <p> Company: {job.company_name}</p>
                              <p> Link:
                                <a href={job.job_link}>{job.job_link}</a>
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
                    <div className="card-body">
                      <h4 className="card-title text-center">Offer</h4>
                      <ul>
                        {this.state.jobs.filter(i => i.loc4 ==true&&i.hide == false).map(job => (
                          <div className="alert alert-info ">
                            <li>
                              <button className="btn card-del delete-btn"  data-id={job.id} id={`delete${job.id}`}>x</button>

                              <p> Title: {job.job_title}</p>
                              <p> Company: {job.company_name}</p>
                              <p> Link:
                                <a href={job.job_link}>{job.job_link}</a>
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
              )
                : (
                  <h3> add jobs</h3>
                )}
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



// <div class="card-deck">
//           <div class="card">
//             <img class="card-img-top" src="assets/images/applied-icon.png" alt="Card image cap">
//             <span class="btn" id="newJob">
//               <img class="card-img-overlay" height="80px" src="assets/images/add-icon.png" alt="Add new job">
//             </span>
//             <div class="card-body">
//               <h5 class="card-title text-center">Applied Jobs</h5>
//               <div class="col-md-12 col-sm-12">
//                 <ul>
//                   {{#each jobs}} {{#unless hide}}{{#if loc1}}
//       				<div class="alert alert-info ">
// 						<button class="btn card-del"  data-id={{id}} id="delete{{id}}">x</button>
					
// 						<li>
// 							<p> Title: {{job_title}}</p>
// 							<p> Company: {{company_name}}</p>
// 							<p> Link:
// 								<a href="{{job_link}}">click here</a>
// 							</p>
// 							<form id="control" >
// 								{{!-- <button type="submit" class="btn btn-primary backbtn" id="back{{id}}" data-loc="1" data-id={{id}}>back</button> --}}
// 								<button type="submit" class="btn btn-primary nextbtn" id="next{{id}}" data-loc="1" data-id={{id}}>next</button>
// 							</form>
// 						</li>
// 					</div>
//                   {{/if}}{{/unless}}{{/each}}
//                 </ul>
//               </div>
//             </div>
//             <div class="card-footer">
//             </div>
//           </div>
//           <div class="card">
//             <img class="card-img-top" src="assets/images/phone-icon.png" alt="Card image cap">
//             <div class="card-body">
//               <h5 class="card-title text-center">Phone Interviews</h5>
//               <div class="col-md-12 col-sm-12">
//                 <ul>
//                   {{#each jobs}} {{#unless hide}}{{#if loc2}}
// 					<div class="alert alert-info ">
// 						<button class="btn card-del"  data-id={{id}} id="delete{{id}}">x</button>
					
// 						<li>
// 							<p> Title: {{job_title}}</p>
// 							<p> Company: {{company_name}}</p>
// 							<p> Link:
// 								<a href="{{job_link}}">click here</a>
// 							</p>
// 							<form id="control" method="PUT">
// 								<button type="submit" class="btn btn-primary backbtn" id="back{{id}}" data-loc="2" data-id={{id}}>back</button>
// 								<button type="submit" class="btn btn-primary nextbtn" id="next{{id}}" data-loc="2" data-id={{id}}>next</button>
// 							</form>
// 						</li>
// 					</div>
//                   {{/if}}{{/unless}}{{/each}}
//                 </ul>
//               </div>
//             </div>
//             <div class="card-footer">
//             </div>
//           </div>

//           <div class="card">
//             <img class="card-img-top" src="assets/images/on-site-icon.png" alt="Card image cap">
//             <div class="card-body">
//               <h5 class="card-title text-center">On-site Interviews</h5>
// 				<div class="col-md-12 col-sm-12">
// 					<ul>
// 					{{#each jobs}} {{#unless hide}}{{#if loc3}}
// 					<div class="alert alert-info ">
// 						<button class="btn card-del"  data-id={{id}} id="delete{{id}}">x</button>
					
// 						<li>
// 							<p> Title: {{job_title}}</p>
// 							<p> Company: {{company_name}}</p>
// 							<p> Link:
// 								<a href="{{job_link}}">click here</a>
// 							</p>
// 							<form id="control" method="PUT">
// 								<button type="submit" class="btn btn-primary backbtn" id="back{{id}}" data-loc="3" data-id={{id}}>back</button>
// 								<button type="submit" class="btn btn-primary nextbtn" id="next{{id}}" data-loc="3" data-id={{id}}>next</button>
// 							</form>
// 						</li>
// 					</div>
// 					{{/if}}{{/unless}}{{/each}}
// 					</ul>
// 				</div>
//             </div>
//             <div class="card-footer">
//             </div>
//           </div>
//           <div class="card">
//             <img class="card-img-top" src="assets/images/outcome-icon.png" alt="Card image cap">
//             <span class="btn" id="trash">
//               <img id= "trashcan" class="card-img-overlay" height="80px" src="assets/images/trashcan.png" alt="Add new job">
//             </span>
//             <div class="card-body">
//               <h5 class="card-title text-center">Offers</h5>
// 				<div class="col-md-12 col-sm-12">
// 					<ul>
// 					{{#each jobs}} {{#unless hide}}{{#if loc4}}
// 					<div class="alert alert-info ">
// 						<button class="btn card-del" data-id={{id}} id="delete{{id}}">x</button>
					
// 						<li>
// 							<p> Title: {{job_title}}</p>
// 							<p> Company: {{company_name}}</p>
// 							<p> Link:
// 								<a href="{{job_link}}">click here</a>
// 							</p>
// 							<form id="control" method="PUT">
// 								<button type="submit" class="btn btn-primary backbtn" id="back{{id}}" data-loc="4" data-id={{id}}>back</button>
// 								{{!-- <button type="submit" class="btn btn-primary nextbtn" id="next{{id}}" data-loc="4" data-id={{id}}>next</button> --}}
// 							</form>
// 						</li>
// 					</div>
// 					{{/if}}{{/unless}}{{/each}}
// 					</ul>
// 				</div>
//             </div>
//             <div class="card-footer">
//             </div>
//           </div>
//         </div>
//       </div>



    //  <Row>
    //     <Col size="md-12">

    //       {this.state.jobs.length ? (
    //         <List>
    //           {this.state.jobs.map(job => (
    //             <ListItem key={job.id}>
    //               <h4>
    //                 {job.company_name}  <br />
    //                 {job.job_title}

    //                 {/* <SaveBtn onClick={() => this.saveuser(job.id)} /> 

    //               </h4>

    //               <span>{job.UserId}</span>
    //               <a href={job.job_link}>  {job.job_link} </a>
    //               {/* <Link to={"/users/" + user._id}>

    //               </Link> */}

    //             </ListItem>
    //           ))}
    //         </List>
    //       ) : (
    //           <h3>No Results to Display</h3>
    //         )}
    //     </Col>
    //   </Row> 