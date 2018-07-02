import React from "react";
import { Link } from "react-router-dom";
import LoginBtn from "../../components/LoginBtn";
import "./Nav.css";

const Nav = () => (
  <nav className="navbar navbar-expand-md fixed-top bg-dark navbar-dark justify-content-between bg-primary">
    <ul className="navbar-nav navbar-right">
    <li>
      <a className="navbar-brand" href="/">
        <img src="../../../assets/images/logo.png" alt="logo"/>
      </a>
    </li>
    </ul>
    <ul className="navbar-nav navbar-right ml-auto">

      {/* <li className="nav-item active">
        <Link to="/Dashboard"><button >Profile </button></Link>
      </li> */}
      <li className="nav-item active">
      <Link to="/Login"><LoginBtn/></Link>
      </li>
    </ul>

  </nav>
);

export default Nav;
