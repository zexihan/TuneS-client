import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Landing from './containers/Landing/Landing';
import Searching from './containers/Searching/Searching';
import NavBar from './components/NavBar/NavBar';

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
              path="/search"
              exact render={props =>
                <Searching {...props} /> }
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default RouterBoard;
