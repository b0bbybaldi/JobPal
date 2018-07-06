import React from "react";
import { BrowserRouter as Router, Route , Switch} from "react-router-dom";
import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Chart from "./pages/Chart";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

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
        <Route exact path="/Chart" component={Chart} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);



export default App;
