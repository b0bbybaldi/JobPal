import React from "react";
import { BrowserRouter as Router, Route , Switch} from "react-router-dom";
import Landing from "./pages/Landing";
import Save from "./pages/Save";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";


const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/saved" component={Save} />
        {/* <Route component={NoMatch} /> */}
      </Switch>
    </div>
  </Router>
);

export default App;
