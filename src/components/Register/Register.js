import React, { Component } from "react";
import "./Register.css";
import { Link } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showError: false
    };
  }

  componentDidMount = () => {
    this.props.userService.getProfile().then(user => {
      if (user.id !== -1) {
        this.props.history.replace("/profile");
      }
    });
  };

  onHideError = () => {
    this.setState({ showError: false });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onRegister = e => {
    const user = {
      id: new Date().getTime().toString(),
      username: this.state.username,
      password: this.state.password,
      courses: []
    };
    this.props.userService.createUser(user).then(user => {
      if (user.id !== -1) {
        this.props.history.push("/profile");
      } else {
        this.setState({ showError: true });
      }
    });
  };

  render() {
    return (
      <div className="container">
        <h1 className="my-2 logo-tomato">
          <i className="fas fa-user-plus" /> Sign Up
        </h1>
        <form>
          <div className="form-group row">
            {this.state.showError && (
              <label htmlFor="alert" className="col-sm-2 col-form-label" />
            )}
            {this.state.showError && (
              <div className="col-sm-10">
                <div
                  id="alert"
                  className="alert alert-warning alert-dismissible fade show"
                  role="alert"
                >
                  <strong>The username you entered already exists.</strong>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                    onClick={this.onHideError}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
            )}
            <label htmlFor="username" className="col-sm-2 col-form-label">
              Username
            </label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="text"
                id="username"
                name="username"
                value={this.state.username}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="password" className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="password"
                id="password"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-2" />
            <div className="col-sm-10">
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={this.onRegister}
              >
                Sign up
              </button>
              <div className="row">
                <div className="col">
                  <Link to="/">Login</Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
