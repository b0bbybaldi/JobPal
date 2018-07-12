# Jobpal

### build a react version of JobPal
This Site aids users in their job hunting process by providing tracking & data visualization tools. 

### Technologe used
1. reactjs
2. express
3. mysql
4. body-parser
5. axios
6. passport
7. passport-local
8. express session
9. bcrypt
10. sweetalert
11. chart js
12. react-router-dom
13. react-responsive-modal
 
### Screen Shots
![Landing Page](./client/public/assets/images/ScreenShot/landing.jpg)

![SignUp Page](./client/public/assets/images/ScreenShot/signup.jpg)

![Dash Page](./client/public/assets/images/ScreenShot/dashboard.jpg)

![Chart Page](./client/public/assets/images/ScreenShot/chart.jpg)

![Admin Page](./client/public/assets/images/ScreenShot/admin.jpg)

### Deployment Notes
1. set the port on server.js to
```js
const PORT = process.env.PORT || 8080;
```
2. Run this command in your Terminal/Bash window:

    * `heroku addons:create jawsdb`

    * This command will add the free jawsdb mysql database to your project.

## Learning points

```js
//git heroku related commands
git remote rm heroku
heroku git:remote -a newname
heroku create
git remote -v
heroku apps:rename abcdefg
heroku addons:create jawsdb
heroku config:get JAWSDB_URL
heroku logs -t
```


```js
// react router usage example need to use <Link> for all nav bar
const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/Login" component={Login} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
```

```js
//formbtn example
import React from "react";

export const FormBtn = props => (
  <button {...props} style={{ float: "right", marginBottom: 10 }} className="btn btn-success">
    {props.children}
  </button>
);

```

```js
//es6 template literal and map example 
<div>
    {this.state.notes.map(note => (
    <li key={note._id}>
        <h6>{`${note.title} says:` }</h6>
        <span>{note.body}</span>
    </li>
    ))}
</div>
```

```js
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

//after serializeUser , then each route need user Authenticated can call those two function below to retrieve user info and whether user Authenticated
console.log(req.user);
console.log(req.isAuthenticated());

```

```js
app.use(routes);

//dont forget add this in server.js otherwise React routes will broken after page refresh since it will lost track of index page
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

```

```js
app.use(routes);

//dont forget add this in server.js otherwise React routes will broken after page refresh (Heroku version) since it will lost track of the index page
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

```

```js
//passport initial settings, need to add express session npm package _expire will set the session expire time
app.use(session({ secret: "somesecret", cookie:{_expires : 30*60*1000}, resave: false, saveUninitialized: false }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
```

```js
router.get('/user/auth', function(req, res) { ... })

router.get('/user/:id', function(req, res) { ... })
//these two path will overlap, better name the first one differently , or the only other solution is putting the first on top of 2nd, other wise route will always hit /user/:id route

```

```js
React learning points are way too much , check the src folder for all the components  adn their definition
Highlights:
{ModalContainer, NextBtn, Chart} in components folder
//define the all different callback and data transfer between child and parent components
{Nav}in components folder
//dynamicly render navbar depending on whether user logged in or not

{SignUp}  in  page folder
//front end user input validation reference on this page

{Login}  in  page folder
//User Login and redirect to different page after login

{Dashboard} in  page folder
// User activity control page passing data to child components and get back then re-render

{AdminPAnel} in  page folder
//Admin activity happen here, defined chart as a child element to render each cohort statistic

```

## Link to the site
[https://jobpal.herokuapp.com](https://jobpal.herokuapp.com)


## Author 
[Kitty Shen ](https://github.com/kittyshen)

https://github.com/kittyshen

### [Link to Portfolio Site](https://kittyshen.github.io/Portfolio/)
[www.kittykuma.com](http://www.kittykuma.com)

## Acknowledgments
This project is a advanced react redesign version over group project 2
* [https://jobobo-flow.herokuapp.com/](https://jobobo-flow.herokuapp.com/)
* [https://github.com/alexgood1/Joboboflow](https://github.com/alexgood1/Joboboflow)

### License
Standard MIT License
