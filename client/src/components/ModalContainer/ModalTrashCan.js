import React from 'react';
import Modal from 'react-responsive-modal';
import API from "../../utils/API";
import "./Modal.css"


export class ModalTrashCan extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      jobs:[],
    }
  };
  
  onOpenModal = () => {
    this.setState({ open: true });
    this.loadJobCards();
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
    window.location.reload()
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

  restoreJob = (id) =>{
    API.restoreUserJob(id)
    .then(res=>{
      console.log(res.data);
      this.loadJobCards();
    })
    .catch(err =>console.log(err))
  }
 
  render() {
    const { open } = this.state;
    // if (this.state.redirect ==true) {
    //   // if login success render user dashboard page
    //  return <Redirect to="/Dashboard"/>
    // }
    // else{
      return (
        <div>
          <img onClick={this.onOpenModal} id= "trashcan" className="card-img-overlay btn" height="80px" src="assets/images/trashcan.png" alt="Add new job"/> 
          {/* <Note onClick={this.onOpenModal}/> */}
          <Modal open={open} onClose={this.onCloseModal} center> 
            <div className="modal-body">
              <div id="TrashCan">Trash Can</div>
              <div>
                <div className = "placeholder alert-danger">  </div>
                {this.state.jobs.filter(i=>i.hide===true).map(job => (
                <div className="alert alert-info" key={job.id}>
                  <li>
                    <p> {job.job_title}</p>
                    <p> Company: {job.company_name}</p>
                    {/* <p> Link:
                      <a href={job.job_link}>Click here</a>
                    </p> */}
                    <p>Deleted at: {job.updatedAt.slice(0,10)}</p>
                    <button type="submit" onClick={()=>this.restoreJob(job.id)} className="btn btn-primary nextbtn" id={`restore${job.id}`} data-id={job.id}>restore</button>
                  </li>
                </div>
                ))}
               </div>
            </div>
          </Modal>
        </div>
      );
    // }
    
  }
}
 
// export default ModalTrashCan;
