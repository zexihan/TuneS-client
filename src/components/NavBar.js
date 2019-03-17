import React, { Component } from 'react';
import {Link} from "react-router-dom";

import '../static/components/NavBar.css';

import AuthService from '../services/AuthService';
let authService = AuthService.getInstance();

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.currentUser
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser !== this.state.currentUser) {
      this.setState({
        currentUser: nextProps.currentUser
      })
    }
  }

  onLogoutClicked = () => {
    authService.logOut();
    this.setState({
      currentUser: null
    })
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
          {this.state.currentUser === null ? null : (
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="btn nav-link">Hi, {this.state.currentUser.id} </a>
              </li>
            </ul>
          )}
          {this.state.currentUser === null ? (
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#" data-toggle="modal" data-target="#login">Log In</a>
              </li>
            </ul>
            ) : (
            <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                 aria-haspopup="true" aria-expanded="false">
                Profile
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item my-2" to={`/user`}>Personal Page</Link>
                <Link className="dropdown-item my-2" to={`/profile`}>Edit Profile</Link>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#" onClick={this.onLogoutClicked}>Log Out</a>
              </div>
            </li>
            </ul>
          )}
        </div>
      </nav>
    );
  }
}

export default NavBar;
