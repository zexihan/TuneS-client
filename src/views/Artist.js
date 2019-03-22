import React, { Component } from 'react';
import { Link } from "react-router-dom";

import '../static/views/Subject.css';

import SearchService from '../services/SearchService';
import AuthService from '../services/AuthService';
let searchService = SearchService.getInstance();
let authService = AuthService.getInstance();

class Artist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: null,
      photo: null,
      isLoggedIn: false,
      loaded: false,
      artist: {},
      comments: "",
      isLiked: false,
      commentCount: 0,
      likeCount: 0
    };
  }

  // track: { album: { images:
  //     [{url: "https://cdn.pixabay.com/photo/2015/02/22/17/56/loading-645268_1280.jpg"}] }//no internet image
  // }
  componentDidMount() {
    const callback = (res) => {
      this.setState({artist: res, loaded: true});
      console.log("artistMount", this.state.artist)
    };
    searchService.getSubject("artist", this.props.match.params.id, callback);

    authService.getProfile().then(
      user => {
        console.log(user);
        if (user.id !== -1) {
          this.setState({
            displayName: user.displayName,
            photo: user.photo,
            isLoggedIn: true
          });
        }
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.logoutStatus === true) {
      this.setState({
        displayName: null,
        isLoggedIn: false
      })
    }
  }

  onCommentsChanged = (e) => {
    this.setState({
      comments: e.target.value
    });
    console.log(e.target.value);
  }

  onAddClicked = () => {
    console.log(this.state.comments);
  }

  onLikeClicked = () => {
    this.setState({
      isLiked: !this.state.isLiked
    });
  }

  render() {
    return (
      this.state.loaded === true &&
      <div className="container-fluid">
        <div className="background-image" style={{backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(' + this.state.artist.images[0].url + ')'}} />
        <div className="content subject-content mt-md-5 mt-sm-3">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <h1 className="title">{this.state.artist.name}</h1>
              <div>Popularity: {this.state.artist.popularity}/100</div>
              <div>Followers: {this.state.artist.followers.total}</div>
              <div>Genres: {this.state.artist.genres.map(genre => <div key={genre}>&middot; {genre}</div>)}</div>
              <div>Comments: {this.state.commentCount}</div>
              <div>Likes: {this.state.likeCount}</div>
              <div className="my-2">
                <button className="btn btn-light" onClick={this.onLikeClicked}>
                  {this.state.isLiked === true ?
                    <span style={{ color: "#cc0000" }}>
                      <i className="fas fa-heart"></i>
                    </span>
                    :
                    <span style={{ color: "black" }}>
                      <i className="far fa-heart"></i>
                    </span>
                  }
                </button>
              </div>
            </div>
            <div className="col-6 d-none d-md-block">
              <div className='float-right embed-container'>
                <iframe src={"https://embed.spotify.com/?uri=spotify:artist:" + this.state.artist.id}
                        width="350px" height="350px" frameBorder="0" allowtransparency="true" allow="encrypted-media"/>
              </div>
            </div>
          </div>

          <div className="row my-3 d-md-none">
            <div className="col-12">
              <div className='text-center embed-container'>
                <iframe src={"https://embed.spotify.com/?uri=spotify:artist:" + this.state.artist.id}
                        width="350px" height="350px" frameBorder="0" allowtransparency="true" allow="encrypted-media"/>
              </div>
            </div>
          </div>
          <div className="row comments my-md-5 my-sm-3">
            <div className="col">
              <h4>Comment</h4>

              {this.state.displayName !== null ? (
                <div className="comment-editor my-3">
                  <div className="row mx-1 my-2">
                    <div className="col-auto align-self-center">
                      <img width="50px" height="50px" src={this.state.photo} />
                    </div>
                    <div className="col">
                      <textarea onChange={this.onCommentsChanged} className="form-control" id="commentTextarea" rows="2" placeholder="Add a comment..." />
                    </div>
                  </div>

                  <div className="row mx-1 my-2">
                    <div className="col">
                      <div className="float-right">
                        <button onClick={this.onAddClicked} className="btn btn-light">Submit</button>
                      </div>
                    </div>
                  </div>

                </div>
              ) : (
                  <div>
                    <a href="#" data-toggle="modal" data-target="#login">Log in to add a comment</a>
                    <hr className="comment-hr" />
                  </div>

                )}

              <h5>Latest comments</h5>

              <hr className="comment-hr" />

              <div>
                <Link to={"/user"}>Zexi</Link> scores: 9.8 2019-03-03
                  <p> 
                    miss MJ ~~~ Jackson has been referred to as the "King of Pop" because, throughout his career, he
                    transformed the art of music videos and paved the way for modern pop music. For much of Jackson's
                    career, he had an unparalleled worldwide influence over the younger generation. His music and videos, 
                    such as Thriller.
                  </p>
              </div>

              <hr className="comment-hr" />

              <div>
                <Link to={"/user"}>Zhongheng</Link> scores: 9.9 2019-03-03
                <p> Love this song </p>
              </div>

              <hr className="comment-hr" />

              <div>
                <Link to={"/user"}>Tao</Link> scores: 9.7 2019-03-03
                <p> Great! </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Artist;
