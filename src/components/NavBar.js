import React, { Component } from 'react';
import {Link} from "react-router-dom";
import $ from 'jquery';
import '../static/components/NavBar.css';

import AuthService from '../services/AuthService';
let authService = AuthService.getInstance();

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      isLoggedIn: false
    };
  }

  componentDidMount() {
    authService.getProfile().then(
      user => {
        console.log(user);
        if (user.id !== -1) {
          this.setState({
            username: user.username,
            isLoggedIn: true
          });
          $(".loggedin-nav").show();
          $(".loggedout-nav").hide();
        } else {
          $(".loggedin-nav").hide();
          $(".loggedout-nav").show();
        }
      }
    );
  }

  onLogoutClicked = () => {
    authService.logOut();
    this.props.logout();
    this.setState({
      username: null,
      isLoggedIn: false
    });
    $(".loggedin-nav").hide();
    $(".loggedout-nav").show();
  }

  render() {
    return (
      <nav className="navbar navbar-custom navbar-expand-md navbar-dark bg-dark">
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
          {/*{this.state.username === null ? null : (*/}
            {/*<ul className="navbar-nav">*/}
              {/*<li className="nav-item">*/}
                {/*<a className="btn nav-link">Hi, {this.state.username} </a>*/}
              {/*</li>*/}
            {/*</ul>*/}
          {/*)}*/}
          {/*{this.state.username === null ? (*/}
            <ul className="navbar-nav loggedout-nav">
              <li className="nav-item">
                <a className="nav-link" href="#" data-toggle="modal" data-target="#login">Log In</a>
              </li>
            </ul>
            {/*) : (*/}
            <ul className="navbar-nav loggedin-nav">
              <li className="nav-item d-none d-md-block">
                <a className="btn nav-link">Hi, {this.state.username} </a>
              </li>
              <li className="nav-item dropdown my-1">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                   aria-haspopup="true" aria-expanded="false">
                  Profile
                </a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item my-2" to={`/user/${this.state.username}`}>Personal Page</Link>
                  <Link className="dropdown-item my-2" to={`/profile`}>Edit Profile</Link>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item" href="#" onClick={this.onLogoutClicked} data-dismiss="modal">Log Out</button>
                </div>
              </li>
            </ul>
          {/*)}*/}
        </div>
      </nav>
    );
  }
}

export default NavBar;
