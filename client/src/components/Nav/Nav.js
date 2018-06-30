import React from "react";
import { Link } from "react-router-dom";

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

      <li className="nav-item active">
        <Link to="/saved">Profile </Link>

      </li>
      <li className="nav-item active">
        <button>
          <Link to="/saved">Login</Link>
        </button>
      </li>
    </ul>

  </nav>
);

export default Nav;
