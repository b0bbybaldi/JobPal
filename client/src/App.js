import React, { Component } from "react";
import { BrowserRouter as Router, Route , Switch, Redirect} from "react-router-dom";
import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import ModalContainer from "./components/ModalContainer";

import API from "./utils/API";

// class App extends Component{
//   state ={
//     login:false,
//     user:{}
//   }

// render() {

//     return (
//       <Router>
//       <div>
//         <Nav />
//         <Switch>
//           <Route exact path="/" component={Landing} />
//           <Route exact path="/SignUp" component={SignUp} />
//           <Route exact path="/Login" component={Login} />
//           <Route path="/Dashboard" component={Dashboard}/>
//           <Route component={NoMatch} />

//         </Switch>
//       </div>
//       </Router>
//     )
//   }
// }

const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/SignUp" component={SignUp} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Dashboard" component={Dashboard} />
        <Route exact path="/Dashboardrefresh" component={Dashboard} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);



export default App;
