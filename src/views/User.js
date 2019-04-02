import React, { Component } from "react";
import { Link } from "react-router-dom";

import Followers from "../components/User/Followers";
import Comments from "../components/User/Comments";
// import AlbumCard from "../components/AlbumCard";
// import ArtistCard from "../components/ArtistCard";
// import Spinner from "../Spinner/Spinner";

import "../static/views/User.css";

import AuthService from '../services/AuthService';
import ArtistCard from "../components/ArtistCard";
let authService = AuthService.getInstance();

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "",
      displayName: "",
      id: null,
      pageId: props.match.params.id,
      isMyself: false,
      isLoggedIn: false,
      portrait: "",
      savedSongs: [],
      followedAlbums: [], //Playlists, Tracks
      followedArtists: [],
      followedUsers: [],
      followers: [],
      publishedSongs: [],
      publishedAlbums: [],
      friends: [],
      comments: [],
      subjectLikes: [],
      commentLikes: []
    };
  }

  componentDidMount() {
    authService.getProfile().then(user => {
      if (user.uid !== -1) {
        if (user.uid == this.props.match.params.id) {
          console.log("myself");
          this.setState({
            displayName: user.displayName, portrait: user.photo, country: user.country,
            id: user.uid,
            isLoggedIn: true,
            isMyself: true,
            comments: user.comments,
            commentLikes: user.commentLikes
          });
          return null;
        }
      }
      authService.getPublicProfile(this.props.match.params.id).then(
        user => {
          console.log("others");
          this.setState({
            displayName: user.displayName, portrait: user.photo, country: user.country,
            id: user.uid,
            isLoggedIn: (user.uid !== -1) ? false : true,
            comments: user.comments,
            commentLikes: user.commentLikes
          });
        }
      );
    })
  }

  followHandler = () => {
    console.log("followed");
  };

  editProfileHandler = () => {
    console.log("go to edit profile page");
  };

  render() {

    const recentComments = this.state.comments.map(comment => {
      return (
        <li key={comment._id}>
          <Link to={"/" + comment.subjectType + "/" + comment.subjectId}>
            {comment.content.slice(0, 20)}
          </Link>
        </li>);
    })

    const favoriteComments = this.state.commentLikes.map(commentLike => {
      return (
        <li key={commentLike._id}>
          <Link to={"/" + commentLike.subjectType + "/" + commentLike.subjectId}>
            {commentLike.content.slice(0, 20)}
          </Link>
        </li>
      )
    })

    const favoriteSubjects = this.state.subjectLikes.map(subjectLike => {
      return (
        <li key={subjectLike.subjectId}>
          {/* {subjectType === "track" && <TrackCard track={subjectLike.track} />} */}
          {/* {subjectType === "artist" && <ArtistCard artist={subjectLike.artist} />} */}
          {/* {subjectType === "album" && <AlbumCard album={subjectLike.album} />} */}
        </li>
      );
    })

    return (
      <div className="container">
        <div className="row user-content mt-3">
          <div className="col">
            <div className="row">
              <div className="col-auto profile-image">
                <img className="img-fluid" src={this.state.portrait === "" ?
                  "https://northmemorial.com/wp-content/uploads/2016/10/PersonPlaceholder.png" : this.state.portrait} />
              </div>
              <div className="col">
                <div className="row">
                  <div className="col">
                    <h2 className="displayName my-1">{this.state.displayName}</h2>
                    <div className="bio my-1">bio</div>
                    <div className="location my-1"><i className="fas fa-map-marker-alt"></i> {this.state.country}</div>
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

        <div id="recent-comments">
          <div className="row mt-2">
            <div className="col">
              <span>My Comments</span>
            </div>
          </div>
          <hr className="user-hr" />
          <div className="row mt-1 ml-2">
            <ul>
              {recentComments}
            </ul>
          </div>
        </div>

        <div id="recent-comments">
          <div className="row mt-2">
            <div className="col">
              <span>Favorite Subjects</span>
            </div>
          </div>
          <hr className="user-hr" />
          <div className="row mt-1 ml-2">
            <ul>
              {favoriteSubjects}
            </ul>
          </div>
        </div>

        <div id="recent-comments">
          <div className="row mt-2">
            <div className="col">
              <span>Favorite Comments</span>
            </div>
          </div>
          <hr className="user-hr" />
          <div className="row mt-1 ml-2">
            <ul>
              {favoriteComments}
            </ul>
          </div>
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
