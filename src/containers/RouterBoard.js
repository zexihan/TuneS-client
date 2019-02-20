import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Landing from '../components/Landing';

class RouterBoard extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <h1>TuneS</h1>
        <Router>
          <Route
            path="/landing"
            exact render={() =>
            <Landing /> } 
          />
        </Router>
      </div>
    );
  }
}

export default RouterBoard;