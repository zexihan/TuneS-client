import React, { Component } from "react";
import "./ProfileEditor.css";
import { Link } from "react-router-dom";

class ProfileEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      username: "",
      portrait: "",
      password: "",
      gender: "",
      phone: "",
      email: "",
      role: "",
      dateofbirth: "",
      courses: [],
      showUpdateInfo: false
    };
  }

  // componentDidMount = () => {
  //   this.props.userService.getProfile().then(user => {
  //     if (user.id !== -1) {
  //       this.setState({
  //         id: user.id,
  //         username: user.username,
  //         password: user.password,
  //         gender: user.gender,
  //         phone: user.phone,
  //         email: user.email,
  //         role: user.role,
  //         dateofbirth: user.dateofbirth,
  //         courses: user.courses
  //       });
  //     } else {
  //       this.props.history.replace("/");
  //     }
  //   });
  // };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onUpdate = e => {
    //   const user = {
    //     id: this.state.id,
    //     username: this.state.username,
    //     password: this.state.password,
    //     gender: this.state.gender,
    //     phone: this.state.phone,
    //     email: this.state.email,
    //     role: this.state.role,
    //     dateofbirth: this.state.dateofbirth,
    //     courses: this.state.courses
    //   };
    //   this.props.userService.updateUser(user).then(user => {
    //     if (user.id !== -1) {
    //       this.setState({
    //         gender: user.gender,
    //         phone: user.phone,
    //         email: user.email,
    //         role: user.role,
    //         dateofbirth: user.dateofbirth,
    //         showUpdateInfo: true
    //       });
    //     }
    //   });
    this.props.history.replace("/profile");
  };

  onHideUpdateInfo = e => {
    this.setState({ showUpdateInfo: false });
  };

  onLogout = e => {
    // this.props.userService.logOut().then(() => this.props.history.push("/"));
    this.props.history.push("/login");
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="content">
          <h1 className="my-2 logo-tomato">
            <i className="fas fa-user-astronaut" /> Profile
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
              <label htmlFor="gender" className="col-sm-2 col-form-label">
                Gender
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="text"
                  id="gender"
                  name="gender"
                  value={this.state.gender}
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
                  <option value="">
                    ----Please select a role--------------
                  </option>
                  <option value="ARTIST">Artist</option>
                  <option value="USER">User</option>
                  <option value="COMPANY">Company</option>
                  <option value="ADVERTISER">Advertiser</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="dateofbirth" className="col-sm-2 col-form-label">
                DOB
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
                <Link className="btn btn-info btn-block" to="/user">
                  Go to My Home Page
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
      </div>
    );
  }
}

export default ProfileEditor;
