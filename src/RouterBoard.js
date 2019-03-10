import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Landing from './views/Landing';
import Searching from './views/Searching';
import User from './views/User';
import Subject from './views/Subject';
import Profile from './views/Profile';
import ProfileEditor from './views/ProfileEditor';
import Register from './views/Register';
import Login from './views/Login';
import NavBar from './components/NavBar';

class RouterBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: []
    }
  }

  search = (subjects) => {
    this.setState({
      subjects
    });
    console.log(subjects);
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <NavBar />
            <Route
              path="/"
              exact render={props =>
                <Landing {...props} search={this.search} /> }
            />
            <Route
              path="/subject_search"
              exact render={props =>
                <Searching {...props} subjects={this.state.subjects} /> }
            />
            <Route
              path="/subject/track/:id"
              exact render={props =>
              <Subject {...props} /> }
            />
            <Route
              path="/user"
              exact render={props =>
              <User {...props} /> }
            />
            <Route
              path="/profile"
              exact render={props =>
              <Profile {...props} /> }
            />
            <Route
              path="/profile-editor"
              exact render={props =>
              <ProfileEditor {...props} /> }
            />
            <Route
              path="/register"
              exact render={props =>
              <Register {...props} /> }
            />
            <Route
              path="/login"
              exact render={props =>
              <Login {...props} /> }
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default RouterBoard;
