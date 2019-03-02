import React, { Component } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      role: "",
      dateofbirth: "",
      courses: [],
      showUpdateInfo: false
    };
  }

  componentDidMount = () => {
    this.props.userService.getProfile().then(user => {
      if (user.id !== -1) {
        this.setState({
          id: user.id,
          username: user.username,
          password: user.password,
          firstname: user.firstName,
          lastname: user.lastName,
          phone: user.phone,
          email: user.email,
          role: user.role,
          dateofbirth: user.dateofbirth,
          courses: user.courses
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
      username: this.state.username,
      password: this.state.password,
      firstName: this.state.firstname,
      lastName: this.state.lastname,
      phone: this.state.phone,
      email: this.state.email,
      role: this.state.role,
      dateofbirth: this.state.dateofbirth,
      courses: this.state.courses
    };
    this.props.userService.updateUser(user).then(user => {
      if (user.id !== -1) {
        this.setState({
          firstname: user.firstName,
          lastname: user.lastName,
          phone: user.phone,
          email: user.email,
          role: user.role,
          dateofbirth: user.dateofbirth,
          showUpdateInfo: true
        });
      }
    });
  };

  onHideUpdateInfo = e => {
    this.setState({ showUpdateInfo: false });
  };

  onLogout = e => {
    this.props.userService.logOut().then(() => this.props.history.push("/"));
  };

  render() {
    return (
      <div className="container">
        <h1 className="my-2 logo-tomato">
          <i className="fas fa-user-astronaut" /> Profile
        </h1>
        <form>
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
                readOnly={true}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="firstname" className="col-sm-2 col-form-label">
              First Name
            </label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="text"
                id="firstname"
                name="firstname"
                value={this.state.firstname}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="lastname" className="col-sm-2 col-form-label">
              Last Name
            </label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="text"
                id="lastname"
                name="lastname"
                value={this.state.lastname}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="phone" className="col-sm-2 col-form-label">
              Phone
            </label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="text"
                id="phone"
                name="phone"
                value={this.state.phone}
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
                <option value="">----Please select a role--------------</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="dateofbirth" className="col-sm-2 col-form-label">
              Date of Birth
            </label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="date"
                id="dateofbirth"
                name="dateofbirth"
                value={this.state.dateofbirth}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-2" />
            <div className="col-sm-10">
              <Link className="btn btn-info btn-block" to="/grid">
                Go to My Course Grid
              </Link>
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
              <button
                type="button"
                className="btn btn-danger btn-block"
                onClick={this.onLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Profile;
