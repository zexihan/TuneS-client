import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../static/views/Profile.css";

import AuthService from '../services/AuthService';
let authService = AuthService.getInstance();

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      displayName: "",
      portrait: "",
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      bio: "",
      location: "",
      showUpdateInfo: false
    };
  }

  componentDidMount = () => {
    authService.getProfile().then(user => {
      if (user.uid !== -1) {
        this.setState({
          id: user.uid,
          displayName: user.displayName,
          firstName: user.firstName,
          lastName: user.lastName,
          portrait: user.portrait,
          email: user.email,
          bio: user.bio,
          location: user.location,
          role: user.role,
        });
      } else {
        this.props.history.replace("/");
      }
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onUpdate = e => {
    const user = {
      id: this.state.id,
      displayName: this.state.displayName,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      portrait: this.state.portrait,
      email: this.state.email,
      bio: this.state.bio,
      location: this.state.location,
      role: this.state.role,
    };

    authService.updateUser(user).then(user => {
      if (user.uid !== -1) {
        this.setState({
          firstName: user.firstName,
          lastName: user.lastName,
          portrait: user.portrait,
          email: user.email,
          bio: user.bio,
          location: user.location,
          role: user.role,
          showUpdateInfo: true
        });
      }
    });
    this.props.history.replace("/profile");
  };

  onHideUpdateInfo = e => {
    this.setState({ showUpdateInfo: false });
  };

  // onLogout = e => {
  //   authService.logOut().then(response => this.props.history.push("/")).catch(error => console.log(error));
  // };

  render() {
    return (
      <div className="container">
        <div className="content">
          <h1 className="my-2">
            Edit Profile
          </h1>
          <form className="mt-4">
            <div className="form-group row">
              {this.state.showUpdateInfo && (
                <label htmlFor="alert" className="col-sm-2 col-form-label" />
              )}
              {this.state.showUpdateInfo && (
                <div className="col-sm-10">
                  <div
                    id="alert"
                    className="alert alert-success alert-dismissible fade show"
                    role="alert"
                  >
                    <strong>Profile successfully saved!</strong>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="alert"
                      aria-label="Close"
                      onClick={this.onHideUpdateInfo}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                </div>
              )}
              <label htmlFor="displayName" className="col-sm-2 col-form-label">
                displayName
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="text"
                  id="displayName"
                  name="displayName"
                  value={this.state.displayName}
                  readOnly={true}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="portrait" className="col-sm-2 col-form-label">
                Portrait
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="text"
                  id="portrait"
                  name="portrait"
                  src={this.state.portrait}
                  onChange={this.onChange}
                  alt="portrait"
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="first-name" className="col-sm-2 col-form-label">
                First Name
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="text"
                  id="first-name"
                  name="first-name"
                  value={this.state.firstName}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="last-name" className="col-sm-2 col-form-label">
                Last Name
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="text"
                  id="last-name"
                  name="last-name"
                  value={this.state.lastName}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="email" className="col-sm-2 col-form-label">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="text"
                  id="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="bio" className="col-sm-2 col-form-label">
                Bio
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="text"
                  id="bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="location" className="col-sm-2 col-form-label">
                Location
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="text"
                  id="location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="role" className="col-sm-2 col-form-label">
                Role
              </label>
              <div className="col-sm-10">
                <select
                  className="form-control"
                  id="role"
                  name="role"
                  value={this.state.role}
                  onChange={this.onChange}
                >
                  <option value="USER">Member</option>
                  <option value="ARTIST">Artist</option>
                  <option value="COMPANY">Company</option>
                  <option value="ADVERTISER">Advertiser</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-2" />
              <div className="col-sm-10">
                <button
                  type="button"
                  className="btn btn-success btn-block"
                  onClick={this.onUpdate}
                >
                  Update
                </button>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-2" />
              <div className="col-sm-10">
                <Link className="btn btn-info btn-block" to="/user">
                  Go to My Personal Page
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Profile;
