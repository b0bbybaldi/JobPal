import React from "react";
import "./LogoutBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const LogoutBtn = props => (
  <span onClick={props.logout} className="btn btn-dark" id="logout" {...props}>
    {props.children}
  </span>

);

export default LogoutBtn;
