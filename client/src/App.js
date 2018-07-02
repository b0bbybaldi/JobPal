import React, { Component } from "react";
import { BrowserRouter as Router, Route , Switch, Redirect} from "react-router-dom";
import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import API from "./utils/API";


// const App = () => (
//   <Router>
//     <div>
//       <Nav />
//       <Switch>
//         <Route exact path="/" component={Landing} />
//         <Route exact path="/SignUp" component={SignUp} />
//         <Route exact path="/Login" component={Login} />
//         <Route exact path="/Dashboard" component={Dashboard} />
//         {/* <Route component={NoMatch} /> */}
//       </Switch>
//     </div>
//   </Router>
// );


// const ProtectedComponent = () => {
//   if (authFails)
//      return <Redirect to='/login'  />
//  }
//  return <div> My Protected Component </div>
//  }

class App extends Component{
  state ={
    login:false,
    user:{}
  }


componentWillMount(){
  // API.loginUser()
  // .then(user=>{
  //   console.log(user)
  //   this.setState({
  //     user: user.data,
  //     login:user.data.login
  //   });
  // })
}

render() {
  const cookie = document.cookie.split(";");

  if (this.state.login) {
    return (
      <Router>
          <div>
            <Nav />
            <Switch>
              <Route exact path="/" component={Dashboard}/>
              <Route path="/Dashboard" component={Dashboard}/>
              <Route component={NoMatch} />
            </Switch>
          </div>
    
        </Router>
      )

  } else {
    return (
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
    )
  }
}
}

export default App;
