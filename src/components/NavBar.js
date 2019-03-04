import React, { Component } from 'react';
import {Link} from "react-router-dom";

import '../static/components/NavBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav className="navbar navbar-custom navbar-expand-lg">
        <a className="navbar-brand" href="/">TuneS</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to={`/`}>Home<span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About</a>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to={`/login`}>Sign in</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/register`}>Sign up</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
