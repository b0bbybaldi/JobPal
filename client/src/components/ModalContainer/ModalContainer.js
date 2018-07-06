import React from 'react';
import Modal from 'react-responsive-modal';
import API from "../../utils/API";

export class ModalContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      oldnote:"",
      note:"",
      jobCompany:"",
      jobTitle:""
    }
  };
  
  onOpenModal = () => {
    this.setState({ open: true });
    this.findJob(this.props.id);
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
  };

  findJob = (id) => {
    API.findJob(id)
      .then(res =>
        {
          console.log(res.data.message);
          this.setState({ oldnote: res.data.message,jobCompany:res.data.company_name,jobTitle:res.data.job_title});
        }
      )
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(this.state.note);
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.note) {
      API.updateUserJob( this.props.id, {
        message: this.state.note,
      })
      .then(res => console.log("note written"))
      .catch(err => console.log(err));
    }
    this.setState({
      note:""
    });
    this.onCloseModal();
  };
 
  render() {
    const { open } = this.state;
    return (
      <div>                                
        <img onClick={this.onOpenModal} className="notes btn card-img-overlay" height="65px" src="assets/images/note2.png" alt="Notes" />
        {/* <Note onClick={this.onOpenModal}/> */}
        <Modal open={open} onClose={this.onCloseModal} center>
          <div className="modal-body">
            <form id="Form">
              <div className="form-group">
                <label className="label-control">Notes for {this.state.jobTitle} at {this.state.jobCompany}</label> 
                {/* <input onChange = {this.handleInputChange} name ="title" value ={this.state.title} placeholder="your name" type="textarea" className="form-control" id="Notes"/> */}
                <textarea placeholder="your notes" type="textarea" onChange = {this.handleInputChange} name ="note" value ={this.state.note} cols="50" rows="8" className="form-control" id="newNote" /> 
              </div>
              <button onClick={this.handleFormSubmit} type="submit" id="addnote_btn" className="btn btn-success btn-outline-success submit">Submit</button>

            </form>
            <div id="oldNotes">Older Note(            <span className ="alert-warning">old notes will lost after submit new notes</span>)</div>
            <div>
              <span>{this.state.oldnote}</span>
             </div>
          </div>
        </Modal>
      </div>
    );
  }
}
 
// export default ModalContainer;
