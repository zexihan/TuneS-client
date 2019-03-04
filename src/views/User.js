import React, { Component } from "react";
import "../static/views/User.css";
import Posts from "../components/User/Posts";
import AlbumCard from "../components/AlbumCard";
import ArtistCard from "../components/ArtistCard";
import Followers from "../components/User/Followers";
import { Link } from "react-router-dom";
// import Spinner from "../Spinner/Spinner";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  followHandler = () => {
    console.log("followed");
  };

  editProfileHandler = () => {
    console.log("go to edit profile page");
  };

  render() {
    return (
      <div className="container">
        <div className="row user-content ml-2 mt-2">
          <div className="col-md-9 col-12 d-block">
            <div className="row">
              <div className="col-1">
                <i className="fas fa-3x fa-user-circle color-tomato" />
              </div>
              <div className="col-2">
                <h2 className="mt-1">Alice</h2>
              </div>
              <div className="col-2">
                <button
                  type="button"
                  className="btn btn-light mt-2"
                  onClick={this.followHandler}
                >
                  Subscribe
                </button>
              </div>
              <div className="col-3">
                <Link
                  to="/profile"
                  className="btn btn-light  mt-2"
                  onClick={this.editProfileHandler}
                >
                  Edit Profile
                </Link>
              </div>
              <div className="col" />
            </div>
          </div>
          <div className="col-md-3 d-none d-md-block" />
          <div className="col-md-9 col-12 d-block">
            <div id="recent-posts">
              <div className="row mt-2">
                <div className="col">
                  <span>Recent Posts</span>
                </div>
              </div>
              <hr className="left-hr" />
              <div className="row mt-1 ml-2">posts</div>
            </div>
            <div id="followed-artists">
              <div className="row mt-2">
                <div className="col">
                  <span>Followed Artists</span>
                </div>
              </div>
              <hr className="left-hr" />
              <div className="row mt-1">
                <ArtistCard />
                <ArtistCard />
                <ArtistCard />
              </div>
            </div>
            <div id="followed-albums">
              <div className="row mt-2">
                <div className="col">
                  <span>Followed Albums (Published Albums)</span>
                </div>
              </div>
              <hr className="left-hr" />
              <div className="row mt-1">
                <AlbumCard />
                <AlbumCard />
                <AlbumCard />
              </div>
            </div>
            <div id="saved-songs">
              <div className="row mt-2">
                <div className="col">
                  <span>Saved Songs (Published Songs)</span>
                </div>
              </div>
              <hr className="left-hr" />
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
          <div className="col-md-3 d-none d-md-block">
            <div id="friends" className="mt-2">
              <span>Friends (Followers)</span>
              <ul className="list-group">
                {this.state.friends.slice(0, 4).map(friend => (
                  <li
                    key={friend.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <Link to={`/user/${friend.id}`} className="ml-1">
                      {friend.username}
                    </Link>
                    <span className="badge badge-primary badge-pill">
                      {friend.id}
                    </span>
                    <i className="far fa-comments" />
                  </li>
                ))}
              </ul>
            </div>
            <div id="liked-items" className="user-block mt-4">
              <div className="user-block-title">
                <span className="ml-2">Liked items</span>
              </div>
              <ul className="mt-1" type="circle">
                <li>item 1</li>
                <li>item 2</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
