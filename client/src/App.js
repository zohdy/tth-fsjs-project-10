import React, { Component } from 'react';
import Courses from './components/Courses';
import Header from "./components/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CourseDetail from "./components/CourseDetail";
import NotFound from "./components/errors/NotFound";
import Error from "./components/errors/NotFound";
import CreateCourse from "./components/CreateCourse";
import UserSignUp from "./components/UserSignUp";
import UserSignIn from "./components/UserSignIn";
import axios from 'axios';
import UserSignOut from "./components/UserSignOut";


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
          if(response.status === 200) {
              this.setState({
                  currentUser: response.data,
                  signedIn: true
              });
              localStorage.setItem('user', JSON.stringify(response.data));
              localStorage.setItem('auth', JSON.stringify(response.config.headers.Authorization));

              history.push('/');
          }

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
              <Route exact path="/" render={ () => <Courses /> } />
              <Route exact path="/courses/create" render={ () => <CreateCourse /> } />
              <Route exact path="/sign-in" render={ () => <UserSignIn signIn={this.signIn} />} />
              <Route exact path="/sign-up" component={ UserSignUp } />
              <Route exact path="/courses/:id" render={ (props) => <CourseDetail id={props.match.params.id} /> } />
              <Route exact path="/sign-out" render={() => <UserSignOut signOut={this.signOut}/>}/>
              <Route path="/error" component={ Error } />
              <Route path="/page-not-found" component={ NotFound } />
              <Route component={ NotFound } />
          </Switch>
      </div>
    </BrowserRouter>
    );
  }
}

export default App;
