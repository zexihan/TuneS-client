import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link, withRouter } from 'react-router-dom';

import '../static/views/Landing.css';

import AlbumCardList from '../components/Landing/AlbumCardList';
// import ArtistCardList from '../components/Landing/ArtistCardList';
import TopCharts from '../components/Landing/TopCharts';
import CarouselShow from '../components/Landing/CarouselShow';
import SearchService from '../services/SearchService';
import AuthService from '../services/AuthService';
let searchService = SearchService.getInstance();
let authService = AuthService.getInstance();

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searchType: "track",
      artistCount: 0,
      tuneserCount: 0,
      playlist: {},
      username: null,
      isLoggedIn: false
    };
  }

  componentDidMount() {
    const callback = (res) => {
      this.setState({playlist: res, loaded: true});
      console.log("playlistMount", this.state.playlist)
    };
    searchService.getSubject("playlist", "59ZbFPES4DQwEjBpWHzrtC", callback)

    authService.getProfile().then(
      user => {
        console.log(user);
        if (user.id !== -1) {
          this.setState({
            username: user.username,
            isLoggedIn: true
          });
        }
      }
    );
  }

  search = async () => {
    let resList = await searchService.query(this.state.searchText, this.state.searchType);
    console.log(await resList);
    var subjects = [];
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
    console.log(subjects);
    this.props.search(subjects);
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
      this.props.history.push({pathname: "/subject_search", search: "?query=" + this.state.searchText + "&type=" + this.state.searchType});
    }
  }

  onSearchTypeChanged = (e) => {
    this.setState({
      searchType: e.target.value
    });
    console.log(e.target.value);
  }

  render() {
    return (
      this.state.loaded === true &&
      <div className="container-fluid">
        <div className="row d-flex justify-content-center py-4" id="search-area">
          <div className="my-auto mx-3">
            <h1 id="brand">TuneS</h1>
          </div>
          <div className="my-auto mx-3">
            <div className="input-group" style={{width: "100%"}}>
              <input type="text" id="search" className="form-control" placeholder="Search..." onChange={this.onSearchFieldChanged} onKeyPress={this.onSearchKeyPressed} />
              <div className="input-group-append">
                <Link to={{pathname: "/subject_search", search: "?query=" + this.state.searchText + "&type=" + this.state.searchType}}>
                  <button className="btn btn-outline-secondary" type="button" onClick={this.search}>
                    <i className="fas fa-search" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="my-auto mx-3">
            <div className="form-check form-check-inline">
              <input onChange={this.onSearchTypeChanged} className="form-check-input" type="radio" name="inlineRadioOptions"
                     id="radio-track" value="track" checked={this.state.searchType === "track"} />
              <label className="form-check-label" htmlFor="radio-track">Track</label>
            </div>
            <div className="form-check form-check-inline">
              <input onChange={this.onSearchTypeChanged} className="form-check-input" type="radio" name="inlineRadioOptions"
                     id="radio-artist" value="artist" checked={this.state.searchType === "artist"} />
              <label className="form-check-label" htmlFor="radio-artist">Artist</label>
            </div>
            <div className="form-check form-check-inline">
              <input onChange={this.onSearchTypeChanged} className="form-check-input" type="radio" name="inlineRadioOptions"
                     id="radio-album" value="album" checked={this.state.searchType === "album"} />
              <label className="form-check-label" htmlFor="radio-album">Album</label>
            </div>
          </div>
        </div>

        <hr className="search-hr"/>

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

        <div className="row landing-content my-3">
          <div className="col-md-9 col-sm-12 left-area">

            <div className="row adv-1 my-1">
              <div className="col">
                <div className="adv-1-content">
                  <CarouselShow />
                </div>
              </div>
            </div>
            <div className="row adv-2 my-4">
              <div className="col">
                <h5>Trending Albums</h5>
                <hr className="left-hr" />
                <div className="adv-2-content">
                  <AlbumCardList playlist={this.state.playlist} />
                </div>
              </div>
            </div>
            {/*<div className="row adv-3 my-4">*/}
              {/*<div className="col">*/}
                {/*<h5>Artists</h5>*/}
                {/*<hr className="left-hr" />*/}
                {/*<div className="adv-3-content">*/}
                  {/*<ArtistCardList playlist={this.state.playlist} />*/}
                {/*</div>*/}
              {/*</div>*/}
            {/*</div>*/}
          </div>
          <div className="col-3 right-area d-none d-md-block">
            <div className="row side-1">
              <div className="col">
                <table className="table table-borderless text-center">
                  <tbody>
                  <tr>
                    <td>{this.state.artistCount}<br/>Artists</td>
                    <td>{this.state.tuneserCount}<br/>TuneSers</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="row side-2 my-3">
              <div className="col">
                <h6>Hot Genres</h6>
                <hr />
                <table className="table table-borderless table-hover-cells">
                  <tbody>
                  <tr>
                    <td>Blues</td>
                    <td>Classical</td>
                  </tr>
                  <tr>
                    <td>Country</td>
                    <td>Dance</td>
                  </tr>
                  <tr>
                    <td>Electronic</td>
                    <td>Jazz</td>
                  </tr>
                  <tr>
                    <td>Pop</td>
                    <td>Rock</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row side-3">
              <div className="col">
                <h6>Top Charts</h6>
                <hr />
                <TopCharts />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Landing);
