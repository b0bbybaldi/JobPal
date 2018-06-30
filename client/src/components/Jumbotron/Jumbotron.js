import React from "react";
import "./Jumbotron.css";

const Jumbotron = ( props) => (
  <div 
    {...props}
    className="jumbotron" 
  >
    {props.children}
  </div>
);

export default Jumbotron;
