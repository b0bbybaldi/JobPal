import React from "react";
import "./LoginBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const LoginBtn = props => (
  <span className="btn btn-dark" id="loginOn" {...props}>
    Login
  </span>

);

export default LoginBtn;
