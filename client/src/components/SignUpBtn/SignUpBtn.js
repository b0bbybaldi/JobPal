import React from "react";
import "./SignUpBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const SignUpBtn = props => (
  <span className="btn btn-info" id="signupOn" {...props}>
    Sign Up
  </span>

);

export default SignUpBtn;
