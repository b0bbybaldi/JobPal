import React from "react";
import { BrowserRouter as Router, Route , Switch} from "react-router-dom";
import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";


const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/SignUp" component={SignUp} />
        {/* <Route component={NoMatch} /> */}
      </Switch>
    </div>
  </Router>
);

export default App;
