import React from "react";
import { BrowserRouter as Router, Route , Switch} from "react-router-dom";
import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";


const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/SignUp" component={SignUp} />
        <Route exact path="/Login" component={Login} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
