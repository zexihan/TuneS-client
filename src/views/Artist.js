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
      username: null,
      isLoggedIn: false,
      loaded: false,
      artist: {},
      comments: ""
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
            username: user.username,
            isLoggedIn: true
          });
        }
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.logoutStatus === true) {
      this.setState({
        username: null,
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
              <div>Reviewed by: 0 TuneSers</div>
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
              <h4>comments now only work for album pages</h4>

              <hr className="comment-hr" />

              {this.state.username !== null ? (
                <div>
                  <div className="row">
                    <div className="col">
                      <h6>{this.state.username}:</h6>
                    </div>
                  </div>

                  <div className="row my-2">
                    <div className="col">
                      <textarea onChange={this.onCommentsChanged} className="form-control" id="commentTextarea" rows="2" placeholder="Your comments" />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <div className="float-right">
                        <button onClick={this.onAddClicked} className="btn btn-light"><i className="fas fa-pen"></i> Add</button>
                      </div>
                    </div>
                  </div>

                  <hr className="comment-hr" />
                </div>
              ):(
                <div>
                  <a href="#" data-toggle="modal" data-target="#login">Log in to comment</a>
                  <hr className="comment-hr" />
                </div>

              )}

              <h5>Latest comments</h5>

              <hr className="comment-hr" />

              <div>
                <Link to={"/user"}>Zexi</Link> scores: 9.8 2019-03-03
                <p> miss MJ ~~~ Jackson has been referred to as the "King of Pop" because, throughout his career, he
                  transformed the art of music videos and paved the way for modern pop music. For much of Jackson's
                  career, he
                  had an unparalleled worldwide influence over the younger generation. His music and videos, such as
                  Thriller,
                  fostered racial diversity in MTV's roster and steered its focus from rock to pop music and R&B, shaping
                  the
                  channel into a form that proved enduring. Jackson's work continues to influence numerous artists of
                  various
                  music genres</p>
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
