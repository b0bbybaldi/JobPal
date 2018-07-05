import React from 'react';
import Modal from 'react-responsive-modal';
// import Note from "../Note";
import API from "../../utils/API";
import "./Modal.css"


export class ModalAddJob extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      title:"",
      company:"",
      link:"",
      note:""
    }
  };
  
  onOpenModal = () => {
    this.setState({ open: true });
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
    window.location.reload()
  };

  // addJob = (id) =>{
  //   API.addUserJob(id,obj)
  //   .then(res=>{
  //     console.log(res.data);
  //   })
  //   .catch(err =>console.log(err))
  // };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(this.state.title);
    // console.log("comments");
    console.log(this.state.company);
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.company) {
      API.addUserJob({
        job_title: this.state.title,
        company_name: this.state.company,
        job_link: this.state.link,
        message: this.state.note
      })
      .then(res=>{
        console.log(res.data);
        console.log("job added");
      })
      .catch(err =>console.log(err))
    }
    
    // this.setState({
    //   title:"",
    //   company:"",
    //   link:"",
    //   note:""
    // });
    this.onCloseModal();
  };
 
  render() {
    const { open } = this.state;
      return (
        <div>
          <img onClick={this.onOpenModal} id= "addjob" className="card-img-overlay btn" height="80px" src="assets/images/add-icon.png" alt="Add new job"/> 
          <Modal open={open} onClose={this.onCloseModal} center> 
            <div className="modal-body">
              <div id="AddJob"><h4>Add Job</h4></div>
              <form id="Form">  
                <div className="form-group">
                  <label className="label-control">Job title</label> 
                  <input onChange = {this.handleInputChange} name ="title" value ={this.state.title} placeholder="title" type="text" className="form-control" />
                  <label className="label-control">Company name</label> 
                  <input onChange = {this.handleInputChange} name ="company" value ={this.state.company} placeholder="company" type="text" className="form-control" />
                  <label className="label-control">Job link</label> 
                  <input onChange = {this.handleInputChange} name ="link" value ={this.state.link} placeholder="job link" type="text" className="form-control"/>
                  <label className="label-control">Your Notes</label> 
                  <textarea placeholder="your note" type="textarea" onChange = {this.handleInputChange} name="note" value ={this.state.note} cols="50" rows="8" className="form-control"/> 
                </div>
                <button onClick={this.handleFormSubmit} type="submit" id="addnote_btn" className="btn btn-success btn-outline-success submit">Submit</button>
              </form>
            </div>
          </Modal>
        </div>
      );    
  }
}
 