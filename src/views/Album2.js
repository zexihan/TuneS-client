import React, { Component } from 'react';
import { Link } from "react-router-dom";

import '../static/views/Subject.css';

import SearchService from '../services/SearchService';
import AuthService from '../services/AuthService';
let searchService = SearchService.getInstance();
let authService = AuthService.getInstance();

class Album extends Component {
  constructor(props) {
      console.log("constrcuted")
    super(props);
    this.state = {
      username: null,
      isLoggedIn: false,
      loaded: false,
      album: {},
      comment: ""
    };
  }

  // track: { album: { images:
  //     [{url: "https://cdn.pixabay.com/photo/2015/02/22/17/56/loading-645268_1280.jpg"}] }//no internet image
  // }
  componentDidMount() {
    console.log('x')
    const callback = (res) => {
      searchService.getComments("album", this.props.match.params.id).then( comments=> {
          console.log("get", comments)
          this.setState({album: res, loaded: true, comments: comments})
      }
    )
      //console.log("albumMount", this.state.album)
    };
<<<<<<< HEAD
    searchService.getSubject("album", this.props.match.params.id, callback)

  }

  componentWillReceiveProps(nextProps) {
      console.log('y')
    const callback = (res) => {
      searchService.getComments("album", this.props.match.params.id).then( comments=> {
              console.log(comments);
              this.setState({album: res,  comments: comments})
          }
      )
      //console.log("albumUpdate", this.state.album)
    };
    searchService.getSubject("album", this.props.match.params.id, callback)
=======
    searchService.getSubject("album", this.props.match.params.id, callback);

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
>>>>>>> han/master
  }

  onCommentsChanged = (e) => {
    this.setState({
      comment: e.target.value
    });
    console.log(e.target.value);
  }

  onAddClicked = () => {
      const callback = (res) => { console.log(res, "rev"); this.props.history.push("/album/" + this.props.match.params.id)} //to render new reviews
    searchService.addComment("album", this.props.match.params.id, this.state.comment).then(res=>callback())
    //console.log(this.state.comment);
  }

  render() {
    console.log("loaded")
      console.log('dc',this.state.comments)
    return (
      this.state.loaded === true &&
      <div className="container-fluid">
        <div className="background-image" style={{backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(' + this.state.album.images[0].url + ')'}} />
        <div className="content subject-content mt-md-5 mt-sm-3">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <h1 className="title">{this.state.album.name}</h1>
              <div>Artist: <Link to={`/artist/${this.state.album.artists[0].id}`}>{this.state.album.artists[0].name}</Link></div>
              <div>Released: {this.state.album.release_date}</div>
              <div>Total tracks: {this.state.album.total_tracks}</div>
              <div>Popularity: {this.state.album.popularity}/100</div>
              <div>Reviewed by: 0 TuneSers</div>
            </div>
            <div className="col-6 d-none d-md-block">
              <div className='float-right embed-container'>
                <iframe src={"https://embed.spotify.com/?uri=spotify:album:" + this.state.album.id}
                        width="350px" height="350px" frameBorder="0" allowtransparency="true" allow="encrypted-media"/>
              </div>
            </div>
          </div>

          <div className="row my-3 d-md-none">
            <div className="col-12">
              <div className='text-center embed-container'>
                <iframe src={"https://embed.spotify.com/?uri=spotify:album:" + this.state.album.id}
                        width="350px" height="350px" frameBorder="0" allowtransparency="true" allow="encrypted-media"/>
              </div>
            </div>
          </div>

          <div className="row comments my-md-5 my-sm-3">
            <div className="col">
              <h4>Tracks</h4>
              {this.state.album.tracks.items.map(track => (
                <div key={track.id}>&middot; <Link to={`/track/${track.id}`}>{track.name}</Link></div>
              ))}
            </div>
          </div>

          <div className="row comments my-4">
            <div className="col">
              <h4>Comments</h4>

              <hr className="comment-hr" />

<<<<<<< HEAD
              <div className="row my-2">
                <div className="col">
                  <textarea onChange={this.onCommentsChanged} value={this.state.comment} className="form-control" id="commentTextarea" rows="2" placeholder="Your comments" />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="float-right">
                    <button onClick={this.onAddClicked} className="btn btn-light"><i className="fas fa-pen"></i> Add</button>
=======
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
>>>>>>> han/master
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


                {this.state.comments.map(comment=>
                    ( <div>
                      <hr className="comment-hr" />

                      <div>
                        Anonymous scores: 9.7 {comment.updatedAt.slice(0, -5).split('T')[0]} &nbsp;
                      {comment.updatedAt.slice(0, -5).split('T')[1]}&nbsp;UTC&nbsp;time
                        <p> {comment.content} </p>
                      </div>
                    </div> )
                )
                }

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Album;
