import React, { Component } from "react";
import { Link } from "react-router-dom";

import Followers from "../components/User/Followers";
import Posts from "../components/User/Posts";
// import AlbumCard from "../components/AlbumCard";
// import ArtistCard from "../components/ArtistCard";
// import Spinner from "../Spinner/Spinner";

import "../static/views/User.css";

import AuthService from '../services/AuthService';
let authService = AuthService.getInstance();

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      pageUsername: this.props.match.params.username,
      isMyself: false,
      isLoggedIn: false,
      portrait: "",
      savedSongs: [],
      followedAlbums: [], //Playlists, Tracks
      followedArtists: [],
      followedUsers: [],
      posts: [],
      followers: [],
      publishedSongs: [],
      publishedAlbums: [],
      friends: [
        { id: "1", username: "Max" },
        { id: "2", username: "Bob" },
        { id: "3", username: "Tom" },
        { id: "4", username: "Tim" }
      ],
      comments: [],
      likedItems: []
    };
  }

  componentDidMount() {
    authService.getProfile().then(
      user => {
        if (user.id !== -1) {
          this.setState({
            username: user.username,
            isLoggedIn: true
          });
        }
        if (this.state.pageUsername === user.username) {
          this.setState({
            isMyself: true
          })
        }
      }
    );
  }

  followHandler = () => {
    console.log("followed");
  };

  editProfileHandler = () => {
    console.log("go to edit profile page");
  };

  render() {
    return (
      <div className="container">
        <div className="row user-content mt-3">
          <div className="col">
            <div className="row">
              <div className="col-auto profile-image">
                <img className="img-fluid" src="https://northmemorial.com/wp-content/uploads/2016/10/PersonPlaceholder.png" />
              </div>
              <div className="col">
                <div className="row">
                  <div className="col">
                    <h2 className="username my-1">{this.state.pageUsername}</h2>
                    <div className="bio my-1">bio</div>
                    <div className="location my-1"><i className="fas fa-map-marker-alt"></i> location</div>
                    <div className="follow-count my-1">Following: 0 Followers: 0</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row my-3">
              {this.state.isMyself === false && this.state.isLoggedIn === true ? (
              <div className="col-auto">
                <button
                  type="button"
                  className="btn btn-light mt-2"
                  onClick={this.followHandler}
                >
                  <i className="fas fa-plus"></i> Follow
                </button>
              </div>
              ) : null}
              {this.state.isMyself === true ? (
                <div className="col-auto">
                  <Link
                    to="/profile"
                    className="btn btn-light  mt-2"
                    onClick={this.editProfileHandler}
                  >
                    <i className="fas fa-user-edit"></i> Edit Profile
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </div>

            <div id="recent-posts">
              <div className="row mt-2">
                <div className="col">
                  <span>Recent Posts</span>
                </div>
              </div>
              <hr className="user-hr" />
              <div className="row mt-1 ml-2">posts</div>
            </div>

            <div id="followed-artists">
              <div className="row mt-2">
                <div className="col">
                  <span>Followed Artists</span>
                </div>
              </div>
              <hr className="user-hr" />
              <div className="row mt-1">
                {/*<ArtistCard />*/}
                {/*<ArtistCard />*/}
                {/*<ArtistCard />*/}
              </div>
            </div>

            <div id="followed-albums">
              <div className="row mt-2">
                <div className="col">
                  <span>Followed Albums (Published Albums)</span>
                </div>
              </div>
              <hr className="user-hr" />
              <div className="row mt-1">
                {/*<AlbumCard />*/}
                {/*<AlbumCard />*/}
                {/*<AlbumCard />*/}
              </div>
            </div>

            <div id="saved-songs">
              <div className="row mt-2">
                <div className="col">
                  <span>Saved Songs (Published Songs)</span>
                </div>
              </div>
              <hr className="user-hr" />
              <ul type="circle" className="playlist mt-1 pl-1">
                <li className="row playlist-song">
                  <div className="col-6 playlist-song-name">
                    How to Save a Life, The Fray
                  </div>
                  <div className="col-6 playlist-song-tools py-1">
                    <i className="far fa-trash-alt mx-2 color-tomato float-right" />
                    <i className="fas fa-redo-alt mx-2 color-tomato float-right" />
                    <i className="far fa-play-circle mx-2 color-tomato float-right" />
                  </div>
                </li>
                <li className="row playlist-song">
                  <div className="col-6 playlist-song-name">
                    Boston, Augustana
                  </div>
                  <div className="col-6 playlist-song-tools py-1">
                    <i className="far fa-trash-alt mx-2 color-tomato float-right" />
                    <i className="fas fa-redo-alt mx-2 color-tomato float-right" />
                    <i className="far fa-play-circle mx-2 color-tomato float-right" />
                  </div>
                </li>
              </ul>
            </div>

          </div>
    );
  }
}

export default User;
