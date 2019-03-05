import React, { Component } from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

import SubjectList from '../components/Searching/SubjectList';

import SearchService from '../services/SearchService';
let searchService = SearchService.getInstance();

class Searching extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: queryString.parse(this.props.location.search).query,
      searchText: queryString.parse(this.props.location.search).query,
      subjects: this.props.subjects,
      type: "track"
    };
  }

  async componentDidMount() {
    if (this.state.subjects.length === 0) {
      let resList = await searchService.query(this.state.searchText);
      console.log(await resList);
      let subjects = await resList.tracks.items;
      this.props.search(subjects);
    }
    console.log("!!!!!!!");
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      console.log("URL changed!");
    }
    this.setState({
      subjects: nextProps.subjects
    })
  }

  search = async () => {
    this.setState({
      query: this.state.searchText
    });
    console.log("search");
    let resList = await searchService.query(this.state.searchText);
    let subjects = await resList.tracks.items;
    this.setState({
      subjects
    });
    console.log(this.state.subjects);
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
              <Link to={{pathname: "/subject_search", search: "?query=" + this.state.searchText}}>
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
          <SubjectList subjects={this.state.subjects} type={this.state.type} />
        </div>
      </div>
    </div>

    );
  }
}

export default Searching;
