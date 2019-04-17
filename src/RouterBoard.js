import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import port from './port.js';

import Landing from './views/Landing';
import Searching from './views/Searching';
import User from './views/User';
import Track from './views/Track';
import About from "./views/About";

import Artist from './views/Artist';
import Album from './views/Album';
import ProfileEditor from "./views/ProfileEditor";
import NavBar from './components/NavBar';
import Footer from './components/Footer';

import UserService from './services/UserService';
let userService = UserService.getInstance();

class RouterBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
      logoutStatus: false,
      username: "",
      password: "",
      isRegistering: false,
      displayName: "",
      email: ""
    };
  }

  search = subjects => {
    this.setState({
      subjects
    });
    console.log(subjects);
  };

  logout = () => {
    this.setState({
      logoutStatus: true
    });
  };

  loginWithUP = () => {

  }

  register = () => {

  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <NavBar logout={this.logout} />
            <div className="page-content">
              <Route
                path="/about"
                exact
                render={props => <About {...props} search={this.search} />}
              />
              <Route
                path="/"
                exact
                render={props => (
                  <Landing {...props} search={this.search} />
                )}
              />
              <Route
                path="/subject_search"
                exact
                render={props => (
                  <Searching {...props} subjects={this.state.subjects} />
                )}
              />
              <Route
                path="/track/:id"
                exact
                render={props => (
                  <Track
                    {...props}
                    logoutStatus={this.state.logoutStatus}
                  />
                )}
              />
              <Route
                path="/artist/:id"
                exact
                render={props => (
                  <Artist
                    {...props}
                    logoutStatus={this.state.logoutStatus}
                  />
                )}
              />
              <Route
                path="/album/:id"
                exact
                render={props => (
                  <Album
                    {...props}
                    logoutStatus={this.state.logoutStatus}
                  />
                )}
              />
              <Route
                path="/user/:id"
                exact
                render={props => (
                  <User {...props} logoutStatus={this.state.logoutStatus} />
                )}
              />
              <Route
                path="/profile"
                exact
                render={props => (
                  <ProfileEditor
                    {...props}
                    logoutStatus={this.state.logoutStatus}
                  />
                )}
              />
            </div>
            <Footer />
          </div>
        </Router>

        <div
          className="modal fade"
          id="login"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLongTitle"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  {!this.state.isRegistering
                    ? "Log In to Connect"
                    : "Register for TuneS"}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <i class="fas fa-times" />
                </button>
              </div>
              <div className="modal-body">
                <div className="row mx-3">
                  {!this.state.isRegistering ? (
                    <div className="col">
                      <div className="form-group">
                        <label for="login-username">Username</label>
                        <input
                          type="text"
                          className="form-control"
                          id="login-username"
                          placeholder="Enter username"
                          onChange={e =>
                            this.setState({ username: e.target.value })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label for="login-password">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="login-password"
                          placeholder="Password"
                          onChange={e =>
                            this.setState({ password: e.target.value })
                          }
                        />
                      </div>
                      <button
                        className="btn btn-primary btn-block"
                        onClick={() => this.loginWithUP()}
                      >
                        Log In
                      </button>
                      <button
                        className="btn btn-primary btn-block"
                        onClick={() =>
                          this.setState({ isRegistering: true })
                        }
                      >
                        Register for TuneS
                      </button>
                    </div>
                  ) : (
                    <div className="col">
                      <div className="form-group">
                        <label for="register-username">Username</label>
                        <input
                          id="register-username"
                          type="text"
                          className="form-control"
                          placeholder="Enter username"
                          onChange={e =>
                            this.setState({ username: e.target.value })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label for="register-display-name">
                          Display Name
                        </label>
                        <input
                          id="register-display-name"
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          onChange={e =>
                            this.setState({ displayName: e.target.value })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label for="register-email">Email</label>
                        <input
                          id="register-email"
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          onChange={e =>
                            this.setState({ email: e.target.value })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label for="register-password">Password</label>
                        <input
                          id="register-password"
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          onChange={e =>
                            this.setState({ password: e.target.value })
                          }
                        />
                      </div>
                      <button
                        className="btn btn-primary btn-block"
                        onClick={() => this.register()}
                      >
                        Register
                      </button>
                      <button
                        className="btn btn-primary btn-block"
                        onClick={() =>
                          this.setState({ isRegistering: false })
                        }
                      >
                        Log In with TuneS
                      </button>
                    </div>
                  )}
                </div>

                <div className="row m-3">
                  <div className="col text-center">Or</div>
                </div>

                <div className="row m-3">
                  <div className="col">
                    <a href={port + "/login/spotify-auth"} target="_blank">
                      <button
                        type="button"
                        className="btn btn-success btn-block"
                      >
                        <i className="fab fa-spotify" /> Log in with Spotify
                      </button>
                    </a>
                  </div>
                </div>
                <div className="row m-3">
                  <div className="col text-center">
                    Refresh me to be logged in after logging in with Spotify
                    {/* Don't have an account? <a id="sign-up" href="https://www.spotify.com/us/signup/?forward_url=https%3A%2F%2Faccounts.spotify.com%2Fauthorize%3Fresponse_type%3Dcode%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A5000%252Flogin%252Fspotify-auth%252Fcallback%26scope%3Duser-read-email%2520user-read-private%26client_id%3Da1e8617e0c7648d99634ae3a3d192590">Sign up for Spotify</a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RouterBoard;
