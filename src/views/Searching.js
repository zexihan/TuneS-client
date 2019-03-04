import React, { Component } from 'react';
import queryString from 'query-string';
import {Link} from "react-router-dom";

class Searching extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: queryString.parse(this.props.location.search).query,
      searchText: queryString.parse(this.props.location.search).query
    };

  }

  componentDidMount = () => {
    console.log(this.state.query);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      console.log("URL changed!");
    }
  }

  search = () => {
    this.setState({
      query: this.state.searchText
    });
    console.log("search");
  }

  searchFieldChanged = (event) => {
    console.log(event.target.value);
    this.setState({
      searchText: event.target.value
    });

  }

  render() {
    return (
    <div className="container-fluid">
      <div className="row pt-5 pb-4" id="search-area">
        <div className="col-4 text-right">
          <h1 id="brand">TuneS</h1>
        </div>
        <div className="col-8">
          <div className="input-group my-2">
            <input type="text"
                   id="search"
                   className="form-control"
                   value={this.state.searchText}
                   onChange={this.searchFieldChanged} />
            <div className="input-group-append">
              <Link to={{pathname: "/search", search: "?query=" + this.state.searchText}}>
                <button className="btn btn-outline-secondary" type="button" onClick={this.search}>
                  <i className="fas fa-search" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <hr className="search-hr"/>

      <div className="row navs py-1">
        <div className="col">
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <a className="nav-link" href="#">New Music</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Playlists</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Music Videos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Top Charts</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Genres</a>
            </li>
          </ul>
        </div>
      </div>


      <div className="row">
        <div className="col mx-5 my-4">
          <h2 id="search-string">Searching: {this.state.query}</h2>
        </div>
      </div>

      <div className="row">
        <div className="col mx-5">
          <p>results</p>
        </div>
      </div>
    </div>

    );
  }
}

export default Searching;
