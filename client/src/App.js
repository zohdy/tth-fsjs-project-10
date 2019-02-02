import React, { Component } from 'react';
import Courses from './components/Courses';
import Header from "./components/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CourseDetail from "./components/CourseDetail";
import NotFound from "./components/errors/NotFound";
import Error from "./components/errors/Error";
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
      signedIn: false
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
          console.log(e);
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
              <Route exact path="/sign-in" render={ () => <UserSignIn signIn={this.signIn} />} />
              <Route exact path="/sign-up" component={ UserSignUp } />
              <Route exact path="/courses/:id" render={ (props) => <CourseDetail id={props.match.params.id} /> } />
              <Route exact path="/sign-out" render={() => <UserSignOut signOut={this.signOut}/>}/>
              <Route path="/error" component={ Error } />
              <Route path="/page-not-found" component={ NotFound } />
              <Route component={ Error } />
          </Switch>
      </div>
    </BrowserRouter>
    );
  }
}

export default App;
