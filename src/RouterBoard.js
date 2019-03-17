import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Landing from './views/Landing';
import Searching from './views/Searching';
import User from './views/User';
import Track from './views/Track';
import Artist from './views/Artist';
import Album from './views/Album';
import Profile from './views/Profile';
import NavBar from './components/NavBar';
import AuthService from './services/AuthService';

class RouterBoard extends Component {
  constructor(props) {
    super(props);
    this.authService = AuthService.getInstance();
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
                <Landing {...props} search={this.search} />}
            />
            <Route
              path="/subject_search"
              exact render={props =>
                <Searching {...props} subjects={this.state.subjects} />}
            />
            <Route
              path="/track/:id"
              exact render={props =>
                <Track {...props} />}
            />
            <Route
              path="/artist/:id"
              exact render={props =>
                <Artist {...props} />}
            />
            <Route
              path="/album/:id"
              exact render={props =>
                <Album {...props} />}
            />
            <Route
              path="/user"
              exact render={props =>
                <User {...props} authService={this.authService} />}
            />
            <Route
              path="/profile"
              exact render={props =>
                <Profile {...props} authService={this.authService} />}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default RouterBoard;
