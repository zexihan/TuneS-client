import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import '../static/views/Landing.css';

import AlbumCardList from '../components/Landing/AlbumCardList';
import TopCharts from '../components/Landing/TopCharts';
import TopChartsMobile from '../components/Landing/TopChartsMobile';
import CarouselShow from '../components/Landing/CarouselShow';
import SearchService from '../services/SearchService';
import UserService from '../services/UserService';
import SubjectService from '../services/SubjectService';
let searchService = SearchService.getInstance();
let userService = UserService.getInstance();
let subjectService = SubjectService.getInstance();

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searchType: "track",
      artistCount: 0,
      tuneserCount: 0,
      playlist: {},
      displayName: null,
      isLoggedIn: false,
      topTracks: [],
      topAlbums: [],
      topArtists: [],
      userCount: {},
      loaded: 0
    };
  }

  componentDidMount() {
    const callback = (res) => {
      this.setState({ playlist: res, loaded: this.state.loaded + 1 });
      console.log("playlistMount", this.state.playlist)
    };
    searchService.getSubject("playlist", "59ZbFPES4DQwEjBpWHzrtC", callback);
    subjectService.findTopSubjects().then(res => {
      console.log(res);
      this.setState({
        topAlbums: res.topAlbums,
        topArtists: res.topArtists,
        topTracks: res.topTracks,
        loaded: this.state.loaded + 1
      });
    });
    userService.getUserCount().then(res => {
      console.log(res);
      this.setState({
        userCount: res,
        loaded: this.state.loaded + 1
      });
    });
    userService.getCurrentUser().then(
      user => {
        console.log(user);
        if (user._id !== -1) {
          this.setState({
            displayName: user.displayName,
            isLoggedIn: true
          });
        }
      }
    );
  }

  search = async () => {
    if (!this.state.searchText) {
      return;
    }

    let resList = await searchService.query(this.state.searchText, this.state.searchType, 0);
    console.log(await resList);
    var subjects = [];
    switch (this.state.searchType) {
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
    if (e.charCode === 13) {
      this.search();
      this.props.history.push({ pathname: "/search", search: "?query=" + this.state.searchText + "&type=" + this.state.searchType + "&offset=" + 0 });
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
      this.state.loaded === 3 && (
        <div className="container-fluid">
          <div className="row d-flex justify-content-center py-4">
            <div className="my-auto mx-3">
              <h1 id="brand">TuneS</h1>
            </div>
            <div className="my-auto mx-3">
              <div className="input-group" style={{ width: "100%" }}>
                <input
                  type="text"
                  id="search"
                  className="form-control"
                  placeholder="Search..."
                  onChange={this.onSearchFieldChanged}
                  onKeyPress={this.onSearchKeyPressed}
                />
                <div className="input-group-append">
                  <Link
                    to={{
                      pathname: "/search",
                      search:
                        "?query=" +
                        this.state.searchText +
                        "&type=" +
                        this.state.searchType +
                        "&offset=" +
                        0
                    }}
                  >
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={this.search}
                    >
                      <i className="fas fa-search" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="my-auto mx-3">
              <div className="form-check form-check-inline">
                <input
                  onChange={this.onSearchTypeChanged}
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="radio-track"
                  value="track"
                  checked={this.state.searchType === "track"}
                />
                <label className="form-check-label" htmlFor="radio-track">
                  Track
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  onChange={this.onSearchTypeChanged}
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="radio-artist"
                  value="artist"
                  checked={this.state.searchType === "artist"}
                />
                <label className="form-check-label" htmlFor="radio-artist">
                  Artist
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  onChange={this.onSearchTypeChanged}
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="radio-album"
                  value="album"
                  checked={this.state.searchType === "album"}
                />
                <label className="form-check-label" htmlFor="radio-album">
                  Album
                </label>
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

          <div className="row landing-content my-3">
            <div className="col-md-9 col-sm-12 left-area">
              <div className="row adv-1 my-1">
                <div className="col">
                  <div className="adv-1-content">
                    <CarouselShow />
                  </div>
                </div>
              </div>
              <div className="row my-4 d-block d-sm-block d-md-none">
                <div className="col">
                  <h5>Top Charts</h5>
                  <hr className="left-hr" />
                  <TopChartsMobile
                    topTracks={this.state.topTracks.slice(0, 3)}
                    topAlbums={this.state.topAlbums.slice(0, 3)}
                    topArtists={this.state.topArtists.slice(0, 3)}
                  />
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
                        <td>
                          <div className="user-count">
                            {this.state.userCount.u1}
                          </div>
                          <div className="user-count-title">TuneSers</div>
                        </td>
                        <td>
                          <div className="user-count">
                            {this.state.userCount.u2}
                          </div>
                          <div className="user-count-title">Editors</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* <div className="row side-2 my-3">
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
            </div> */}
              <div className="row side-3">
                <div className="col">
                  <h6>Top Charts</h6>
                  <hr />
                  <TopCharts
                    topTracks={this.state.topTracks}
                    topAlbums={this.state.topAlbums}
                    topArtists={this.state.topArtists}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}

export default withRouter(Landing);
