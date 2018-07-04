import React from 'react';
import Modal from 'react-responsive-modal';
import Note from "../Note";
import API from "../../utils/API";
import { Redirect } from "react-router-dom";


class ModalContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      jobs:[],
      redirect:false,
    }
  };
  
  onOpenModal = () => {
    this.setState({ open: true });
    this.loadJobCards();
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
    this.setState({ redirect: true });
    window.location.reload(); 

  };

  loadJobCards = () => {
    API.getUserJobs()  // reuse the get all User Jobs function then only filter out hide = true cards to render
    .then(res =>
      {
        console.log(res.data);
        this.setState({ jobs: res.data})
      }
    )
    .catch(err => console.log(err));
  };

  deleteJob = (id) =>{
    API.restoreUserJob(id)
    .then(res=>{
      console.log(res.data);
      this.loadJobCards();
    })
    .catch(err =>console.log(err))
  }


  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.body) {
      API.saveNote({
        title: this.state.title,
        body: this.state.body,
      }, this.props.id)
        .then(res => console.log("note written"))
        .catch(err => console.log(err));
    }
    this.setState({
      title:"",
      body:""
    });
    this.onCloseModal();
  };
 
  render() {
    const { open } = this.state;
    if (this.state.redirect ==true) {
      // if login success render user dashboard page
    //  return <Redirect to="/Dashboard"/>
    }
    else{
      return (
        <div>
          <img onClick={this.onOpenModal} id= "trashcan" className="card-img-overlay" height="80px" src="assets/images/trashcan.png" alt="Add new job"/>
          {/* <Note onClick={this.onOpenModal}/> */}
          <Modal open={open} onClose={this.onCloseModal} center>
            <div className="modal-body">
              {/* <form id="Form">
                <div className="form-group">
                  <label className="label-control">Trash Can</label> 
                  <input onChange = {this.handleInputChange} name ="title" value ={this.state.title} placeholder="your name" type="textarea" className="form-control" id="Notes"/>
                  <textarea placeholder="your notes" type="textarea" onChange = {this.handleInputChange} name ="body" value ={this.state.body} cols="50" rows="8" className="form-control" id="newNote" /> 
                </div>
                <button onClick={this.handleFormSubmit} type="submit" id="addnote_btn" className="btn btn-success btn-outline-success submit">Submit</button>
  
              </form> */}
              <div id="TrashCan">Trash Can</div>
              <div>
                {this.state.jobs.filter(i=>i.hide==true).map(job => (
                <div className="alert alert-info " key={job.id}>
                  <li>
                    <p> {job.job_title}</p>
                    <p> Company: {job.company_name}</p>
                    <p> Link:
                      <a href={job.job_link}>Click here</a>
                    </p>
                    <button type="submit" onClick={()=>this.deleteJob(job.id)} className="btn btn-primary nextbtn" id={`restore${job.id}`} data-loc="1" data-id={job.id}>restore</button>
                  </li>
                </div>
                ))}
               </div>
            </div>
          </Modal>
        </div>
      );
    }
    
  }
}
 
export default ModalContainer;
