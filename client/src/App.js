import React, { Component } from 'react';
import Courses from './components/Courses';
import Header from "./components/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CourseDetail from "./components/CourseDetail";
import NotFound from "./components/errorComponents/NotFound";
import UnhandledError from "./components/errorComponents/UnhandledError";
import Forbidden from './components/errorComponents/Forbidden';
import CreateCourse from "./components/CreateCourse";
import UserSignUp from "./components/UserSignUp";
import UserSignIn from "./components/UserSignIn";
import axios from 'axios';
import UserSignOut from "./components/UserSignOut";
import UpdateCourse from "./components/UpdateCourse";
import PrivateRoute from "./components/PrivateRoute";


class App extends Component {
  state = {
      currentUser: '',
      signedIn: false,
  };

  componentDidMount() {
    if(localStorage.user){
        this.setState({
            signedIn: true,
            currentUser: JSON.parse(window.localStorage.getItem('user'))
        })
    }
  }

    signIn = async (email, password, history) => {
      try {
          const response = await axios.get('http://localhost:5000/api/users',
              { auth: {username: email, password: password} });
              localStorage.setItem('user', JSON.stringify(response.data));
              localStorage.setItem('auth', JSON.stringify(response.config.headers.Authorization));
              this.setState({ currentUser: response.data, signedIn: true});
      } catch (e) {
            if(e.response.status !== 401){
                history.push('/error');
            }
      }
   };

   signOut = () => {
       this.setState({
           user: '',
           signedIn: false
       });
       localStorage.clear();
   };


  render() {
    return (
    <BrowserRouter>
      <div className="App">
          <Route path="/" render={() => <Header user={this.state.currentUser} signedIn={this.state.signedIn} />} />
          <Switch>
              <PrivateRoute path="/courses/create" component={CreateCourse} user={this.state.currentUser} /> } />
              <PrivateRoute path="/courses/:id/update" component={UpdateCourse}  /> } />
              <Route exact path="/" render={ () => <Courses /> } />
              <Route exact path="/signin" render={ () => <UserSignIn signIn={this.signIn} />} />
              <Route exact path="/signup" component={ UserSignUp } />
              <Route exact path="/courses/:id" render={ (props) => <CourseDetail id={props.match.params.id} /> } />
              <Route exact path="/signout" render={() => <UserSignOut signOut={this.signOut}/>}/>
              <Route path="/forbidden" component={ Forbidden } />
              <Route path="/error" component={ UnhandledError } />
              <Route path="/page-not-found" component={ NotFound } />
              <Route component={ NotFound } />
          </Switch>
      </div>
    </BrowserRouter>
    );
  }
}

export default App;
