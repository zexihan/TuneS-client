import React, { Component } from "react";
import "./User.css";
import Posts from "./Posts";
import AlbumCard from "../AlbumCard/AlbumCard";
import ArtistCard from "../ArtistCard/ArtistCard";
import Followers from "./Followers";
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
      publishedAlbums: []
    };
  }

  render() {
    return (
      <div className="container">
        <div className="row user-content mt-2">
          <div className="col-md-9 col-12">
            <div className="row">
              <div className="col-1">
                <i className="fas fa-3x fa-user-circle color-tomato" />
              </div>
              <div className="col-1">
                <h1>Alice</h1>
              </div>
              <div className="col" />
            </div>
            <div className="row bd-sidebar">
              <div className="col">
                <h5 className="text-info">Followed Artists</h5>
              </div>
            </div>
          </div>
          <div className="col-3" />
        </div>
      </div>
    );
  }
}

export default User;
