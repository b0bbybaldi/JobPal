import React, {Component} from "react";
import { Link } from "react-router-dom";
import LoginBtn from "../../components/LoginBtn";
import LogoutBtn from "../../components/LogoutBtn";
import API from "../../utils/API";
import { BrowserRouter as Redirect} from "react-router-dom";
import "./Nav.css";

class Nav extends Component {
  state={
    login:false
  }

  componentDidMount() {
    this.checkAuth();
  }

  checkAuth =()=>{
    API.checkAuth()
    .then(res=>{
      console.log("nav check auth $$$$$$%",res.data)
      if(res.data == true)
      this.setState({login:true});
      else
      this.setState({login:false});
    })
  }

  logout =()=>{
    API.logout()
    .then(res =>{
      this.setState({login:false});
    })
    window.location.replace('/');
  }

  // login =()=>{
  //   API.logout()
  //   .then(res =>{
  //     this.setState({login:true});
  //   })
  // }

  render(){
    // if (this.state.login ==false) {

    // return <Redirect to="/Login"/>
    // }
    // else
      return(
        <nav className="navbar navbar-expand-md fixed-top bg-dark navbar-dark justify-content-between bg-primary">
          <ul className="navbar-nav navbar-right">
          <li>
            <a className="navbar-brand" href="/">
              <img src="../../../assets/images/logo.png" alt="logo"/>
            </a>
          </li>
          </ul>
          <ul className="navbar-nav navbar-right ml-auto">
          {this.state.login == false?
            (<li className="nav-item active">
            <Link to="/Login"><LoginBtn onClick={this.login}>Login</LoginBtn></Link>
            </li>)
            :(<li className="nav-item active">
            <LogoutBtn logout={this.logout}>Logout</LogoutBtn>
            </li>)
          }
          </ul>   
        </nav>
      )
  }
    
}



  

export default Nav;
