import React, { Component } from "react";
import "./LogIn.css";
import { Link } from "react-router-dom";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showError: false
    };
  }

  // componentDidMount = () => {
  //   this.props.userService.getProfile().then(user => {
  //     if (user.id !== -1) {
  //       this.props.history.replace("/profile");
  //     }
  //   });
  // };

  onHideError = () => {
    this.setState({
      showError: false
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onLogin = e => {
    // const user = {
    //   username: this.state.username,
    //   password: this.state.password
    // };
    // this.props.userService.logIn(user).then(user => {
    //   if (user.id !== -1) {
    //     this.props.history.push("/profile");
    //   } else {
    //     this.setState({ showError: true });
    //   }
    // });
    this.props.history.push("/profile");
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="content">
          <h1 className="my-2 logo-tomato">
            <i className="fas fa-sign-in-alt" /> Sign In
          </h1>
          <form className="mt-4">
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
                    <strong>
                      The username or password you entered is incorrect.
                    </strong>
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
                  placeholder=""
                />
              </div>
            </div>
            <div className="form-group row mb-1">
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
                  placeholder=""
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col text-center">
                <Link className="forgetpassword" to="/forgetpassword">
                  Forgot your password?
                </Link>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-2" />
              <div className="col-sm-10">
                <button
                  type="button"
                  className="btn btn-success btn-block"
                  onClick={this.onLogin}
                >
                  LOG IN
                </button>
              </div>
            </div>
          </form>
          <div className="divider" />
          <div className="row">
            <div className="col text-center my-2 ">
              <strong>Don't have an account?</strong>
            </div>
          </div>
          <div>
            <Link to="/register" className="btn btn-outline-info btn-block">
              SIGN UP FOR TUNES
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default LogIn;
