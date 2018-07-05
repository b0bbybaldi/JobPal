import React from "react";
import API from "../../utils/API";
import "./NextBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
class NextBtn extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id:""
    }
  };

  changeLocation = (id,loc) => {
    //define a function to handle the current card location with the user press butten event, output will be
    //the job obj new location data
    function LocToDataConvert(loc) {
      var dataArr = [];
      switch (loc) {
          case "1":
              dataArr = [1,1,0,0,0,1,0,0]
              break;
          case "2":
              dataArr = [1,1,1,0,0,0,1,0]
              break;
          case "3":
              dataArr = [1,1,1,1,0,0,0,1]
              break;
          default:
              dataArr = [1,0,0,0,1,0,0,0]
              break;
      }
      return dataArr;
    }

    var dataArr = LocToDataConvert(loc);
    console.log(dataArr);
    //transfer it to dataObj prepare for put call
    var dataObj ={
        applied:dataArr[0],
        phone_interview:dataArr[1],
        site_interview:dataArr[2],
        outcome:dataArr[3],
        loc1:dataArr[4],
        loc2:dataArr[5],
        loc3:dataArr[6],
        loc4:dataArr[7]
    }
    API.updateUserJob(id,dataObj)
    .then(res =>{
      console.log(res.data);
    })
    .catch(err => console.log(err));

  }

  render() {
    return (
      <button  {...this.props} onClick={()=>this.changeLocation(this.props.data_id,this.props.data_loc)}>
        {this.props.children}
      </button>
    )
  }
}

export default NextBtn;
