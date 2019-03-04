import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Landing from './views/Landing';
import Searching from './views/Searching';
import User from './views/User';
import Subject from './views/Subject';
import NavBar from './components/NavBar';

class RouterBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
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
                <Landing {...props} /> }
            />
            <Route
              path="/subject_search"
              exact render={props =>
                <Searching {...props} /> }
            />
            <Route
              path="/subject"
              exact render={props =>
              <Subject {...props} /> }
            />
            <Route path="/user" exact component={User} />
          </div>
        </Router>
      </div>
    );
  }
}

export default RouterBoard;
