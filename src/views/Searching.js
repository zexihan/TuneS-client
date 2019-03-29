import React, { Component } from 'react';
import queryString from 'query-string';
import { Link, withRouter } from 'react-router-dom';

import SubjectList from '../components/Searching/SubjectList';

import SearchService from '../services/SearchService';
let searchService = SearchService.getInstance();

class Searching extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: queryString.parse(this.props.location.search).query,
      searchText: queryString.parse(this.props.location.search).query,
      subjects: "",
      preSearchType: queryString.parse(this.props.location.search).type,
      searchType: queryString.parse(this.props.location.search).type
    };
  }

  async componentDidMount() {
    console.log("componentDidMount");
    if (this.state.subjects.length === 0) {
      if (!this.state.searchText) {
        return;
      }
      let resList = await searchService.query(this.state.searchText, this.state.searchType);
      console.log(await resList);
      let subjects = [];
      switch(this.state.searchType) {
        case "track": {
          subjects = await resList.tracks.items;
          break;
        }
        case "artist": {
          subjects = await resList.artists.items;
          break;
        }
        case "album": {
          subjects = await resList.albums.items;
          break;
        }
      }
      // this.props.search(subjects);
      this.setState({
        subjects
      });
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
    if (this.state.searchText === "") {
      return;
    }
    console.log("search");
    let resList = await searchService.query(this.state.searchText, this.state.preSearchType);
    let subjects = [];
    switch (this.state.preSearchType) {
      case "track": {
        subjects = await resList.tracks.items;
        break;
      }
      case "artist": {
        subjects = await resList.artists.items;
        break;
      }
      case "album": {
        subjects = await resList.albums.items;
        break;
      }
    }
    this.setState({
      subjects: subjects,
      searchType: this.state.preSearchType
    });
    console.log(this.state.subjects);
  }

  onSearchFieldChanged = (e) => {
    console.log(e.target.value);
    this.setState({
      searchText: e.target.value
    });
  }

  onSearchKeyPressed = (e) => {
    if(e.charCode === 13){
      this.search();
      this.props.history.push({pathname: "/subject_search", search: "?query=" + this.state.searchText + "&type=" + this.state.preSearchType});
    }
  }

  onSearchTypeChanged = (e) => {
    this.setState({
      preSearchType: e.target.value
    });
    console.log("preSearchType:" + e.target.value);
    console.log("searchType:" + this.state.searchType);
  }

  render() {
    return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center py-4" id="search-area">
        <div className="my-auto mx-3">
          <h1 id="brand">TuneS</h1>
        </div>
        <div className="my-auto mx-3">
          <div className="input-group my-2"  style={{width: "100%"}}>
            <input type="text"
                   id="search"
                   className="form-control"
                   value={this.state.searchText}
                   onChange={this.onSearchFieldChanged}
                   onKeyPress={this.onSearchKeyPressed} />
            <div className="input-group-append">
              <Link to={{pathname: "/subject_search", search: "?query=" + this.state.searchText + "&type=" + this.state.preSearchType}}>
                <button className="btn btn-outline-secondary" type="button" onClick={this.search}>
                  <i className="fas fa-search" />
                </button>
              </Link>
              {/*this maybe why this is "flash", not a good pattern to have two actions in one click?*/}
            </div>
          </div>
        </div>
        <div className="my-auto mx-3">
          <div className="form-check form-check-inline">
            <input onChange={this.onSearchTypeChanged} className="form-check-input" type="radio" name="inlineRadioOptions"
                   id="radio-track" value="track" checked={this.state.preSearchType === "track"} />
            <label className="form-check-label" htmlFor="radio-track">Track</label>
          </div>
          <div className="form-check form-check-inline">
            <input onChange={this.onSearchTypeChanged} className="form-check-input" type="radio" name="inlineRadioOptions"
                   id="radio-artist" value="artist" checked={this.state.preSearchType === "artist"} />
            <label className="form-check-label" htmlFor="radio-artist">Artist</label>
          </div>
          <div className="form-check form-check-inline">
            <input onChange={this.onSearchTypeChanged} className="form-check-input" type="radio" name="inlineRadioOptions"
                   id="radio-album" value="album" checked={this.state.preSearchType === "album"} />
            <label className="form-check-label" htmlFor="radio-album">Album</label>
          </div>
        </div>
      </div>

      <hr className="search-hr" />

      {/*<div className="row navs py-1">*/}
        {/*<div className="col">*/}
          {/*<ul className="nav justify-content-center">*/}
            {/*<li className="nav-item">*/}
              {/*<a className="nav-link" href="#">New Music</a>*/}
            {/*</li>*/}
            {/*<li className="nav-item">*/}
              {/*<a className="nav-link" href="#">Playlists</a>*/}
            {/*</li>*/}
            {/*<li className="nav-item">*/}
              {/*<a className="nav-link" href="#">Music Videos</a>*/}
            {/*</li>*/}
            {/*<li className="nav-item">*/}
              {/*<a className="nav-link" href="#">Top Charts</a>*/}
            {/*</li>*/}
            {/*<li className="nav-item">*/}
              {/*<a className="nav-link" href="#">Genres</a>*/}
            {/*</li>*/}
          {/*</ul>*/}
        {/*</div>*/}
      {/*</div>*/}


      <div className="row">
        <div className="col mx-5 my-4">
          <h2 id="search-string">Search {this.state.searchType}: {this.state.query}</h2>
        </div>
      </div>
      {this.state.subjects.length ? (
        <div className="row">
          <div className="col mx-5">
            <SubjectList subjects={this.state.subjects} type={this.state.searchType} />
          </div>
        </div>
      ) : (null)}
    </div>

    );
  }
}

export default withRouter(Searching);
