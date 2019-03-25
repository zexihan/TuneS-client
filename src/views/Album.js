import React, { Component } from 'react';
import { Link } from "react-router-dom";

import '../static/views/Subject.css';

import SearchService from '../services/SearchService';
import AuthService from '../services/AuthService';
let searchService = SearchService.getInstance();
let authService = AuthService.getInstance();

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: null,
      photo: null,
      isLoggedIn: false,
      loaded: false,
      album: {},
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
    console.log('x')
    const callback = (res) => {
      searchService.getComments("album", this.props.match.params.id).then(comments => {
        console.log("get", comments)
        this.setState({ album: res, loaded: true, comments: comments })
      }
      )
      //console.log("albumMount", this.state.album)
    };
    searchService.getSubject("album", this.props.match.params.id, callback)

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
    console.log('y');
    const callback = (res) => {
      searchService.getComments("album", this.props.match.params.id).then(comments => {
        console.log(comments);
        this.setState({ album: res, comments: comments })
      }
      )
      //console.log("albumUpdate", this.state.album)
    };
    searchService.getSubject("album", this.props.match.params.id, callback)

    if (nextProps.logoutStatus === true) { //logoutStatus: on router board
      this.setState({
        displayName: null,
        isLoggedIn: false
      })
    }
  }

  onCommentsChanged = (e) => {
    this.setState({
      comment: e.target.value
    });
    console.log(e.target.value);
  }

  onAddClicked = () => {
    const callback = (res) => { console.log(res, "rev"); this.props.history.push("/album/" + this.props.match.params.id) } //to render new reviews
    searchService.addComment("album", this.props.match.params.id, this.state.comments).then(res => callback())
    //console.log(this.state.comments);
  }

  onLikeClicked = () => {
    this.setState({
      isLiked: !this.state.isLiked
    });
  }

  onCommentLikeClicked = e => {
    console.log(e.currentTarget.getAttribute("value"));
  }

  render() {
    console.log("loaded");
    console.log('dc', this.state.comments);
    return (
      this.state.loaded === true &&
      <div className="container-fluid">
        <div className="background-image" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(' + this.state.album.images[0].url + ')' }} />
        <div className="content subject-content mt-md-5 mt-sm-3">
          <div className="row">
            <div className="col-6">
              <h1 className="title">{this.state.album.name}</h1>
              <div>Artist: <Link to={`/artist/${this.state.album.artists[0].id}`}>{this.state.album.artists[0].name}</Link></div>
              <div>Released: {this.state.album.release_date}</div>
              <div>Total tracks: {this.state.album.total_tracks}</div>
              <div>Popularity: {this.state.album.popularity}/100</div>
              <div>Comments: {this.state.commentCount}</div>
              <div>Likes: {this.state.likeCount}</div>
              {this.state.displayName !== null ?
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
                :
                <div>
                  <a href="#" data-toggle="modal" data-target="#login">Log in to like</a>
                </div>
              }
            </div>
            <div className="col-6 d-none d-md-block">
              <div className='float-right embed-container'>
                <iframe src={"https://embed.spotify.com/?uri=spotify:album:" + this.state.album.id}
                  width="350px" height="350px" frameBorder="0" allowtransparency="true" allow="encrypted-media" />
              </div>
            </div>
          </div>

          <div className="row my-3 d-md-none">
            <div className="col-12">
              <div className='text-center embed-container'>
                <iframe src={"https://embed.spotify.com/?uri=spotify:album:" + this.state.album.id}
                  width="350px" height="350px" frameBorder="0" allowtransparency="true" allow="encrypted-media" />
              </div>
            </div>
          </div>

          <div className="row comments my-5">
            <div className="col">
              <h4>Tracks</h4>
              {this.state.album.tracks.items.map(track => (
                <div key={track.id}>&middot; <Link to={`/track/${track.id}`}>{track.name}</Link></div>
              ))}
            </div>
          </div>

          <div className="row comments my-5">
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
                        <button onClick={this.onAddClicked} className="btn btn-light">Add</button>
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
              {this.state.comments.map((comment, i) => (
                <div className="comment-list-item" key={i}>

                  <hr className="comment-hr" />

                  <div className="row">
                    <div className="col-auto align-self-center">
                      {comment.anony === true ? <img width="40px" height="40px" src={
                        "https://northmemorial.com/wp-content/uploads/2016/10/PersonPlaceholder.png"} /> :
                        <img width="40px" height="40px" src={comment.user.photo === "" ?
                          "https://northmemorial.com/wp-content/uploads/2016/10/PersonPlaceholder.png" : comment.user.photo} />}
                    </div>
                    <div className="col">
                      {comment.anony === true ?
                        "Anonymous"
                        :
                        <Link to={`/user/${comment.user.sid}`}>{comment.user.displayName}</Link>
                      }: {comment.content}
                      <br />
                      <div className="comment-time">
                        {comment.updatedAt.slice(0, -5).split('T')[0]}&nbsp;
                          {comment.updatedAt.slice(0, -5).split('T')[1]}&nbsp;UTC&nbsp;
                        </div>
                    </div>
                    <div className="col align-self-center">
                      <span className="float-right" style={{ fontSize: "18px" }} onClick={this.onCommentLikeClicked} value={comment.content}>
                        <i className="far fa-thumbs-up"></i>
                      </span>
                    </div>
                  </div>
                </div>
              ))
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Album;