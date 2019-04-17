import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../static/views/Subject.css";

import UserService from "../services/UserService";
import SearchService from "../services/SearchService";
import SubjectService from "../services/SubjectService";
let userService = UserService.getInstance();
let searchService = SearchService.getInstance();
let subjectService = SubjectService.getInstance();

class Track extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: null,
      photo: null,
      isLoggedIn: false,
      loaded: 0,
      track: {},
      comments: [],
      comment: "",
      isLiked: false,
      commentLikes: [],
      showLyric: false,
      lyric: "",
      type: 1,
      editing: false
    };
  }

  componentDidMount() {
    subjectService
      .getSubjectById(this.props.match.params.id)
      .then(res => {
        this.setState({ lyric: res.lyric });
      })
      .catch(err => alert("cannot find lyric"));
    const callback = res => {
      subjectService
        .findCommentsBySubjectId("track", this.props.match.params.id)
        .then(comments => {
          console.log("get", comments);
          this.setState({
            track: res,
            comments: comments,
            loaded: this.state.loaded + 1
          });
        });
    };
    searchService.getSubject("track", this.props.match.params.id, callback);

    userService.getCurrentUser().then(user => {
      console.log(user);
      if (user._id !== -1) {
        this.setState({
          displayName: user.displayName,
          photo: user.photo,
          isLoggedIn: true,
          loaded: this.state.loaded + 1,
          type: user.type
        });
        subjectService
          .findSubjectIsLiked("track", this.props.match.params.id)
          .then(res => {
            console.log(res);
            this.setState({
              isLiked: res.isliked,
              loaded: this.state.loaded + 1
            });
          });
        subjectService.findCommentLikesByCurrentUser().then(res => {
          console.log(res);
          this.setState({
            commentLikes: res,
            loaded: this.state.loaded + 1
          });
        });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const callback = res => {
      subjectService
        .findCommentsBySubjectId("track", this.props.match.params.id)
        .then(comments => {
          console.log(comments);
          this.setState({ track: res, comments });
        });
    };
    searchService.getSubject("track", this.props.match.params.id, callback);

    if (nextProps.logoutStatus === true) {
      this.setState({
        displayName: null,
        isLoggedIn: false
      });
    }
  }

  onCommentChanged = e => {
    this.setState({
      comment: e.target.value
    });
    console.log(e.target.value);
  };

  onAddClicked = () => {
    const callback = res => {
      console.log(res, "rev");
      this.setState({
        comment: ""
      });
      this.props.history.push("/track/" + this.props.match.params.id);
    }; //to render new reviews
    const subject = {
      _id: this.props.match.params.id,
      type: "track",
      title: this.state.track.name,
      image:
        this.state.track.album.images.length > 0
          ? this.state.track.album.images[0].url
          : null
    };
    subjectService
      .addComment(subject, this.state.comment)
      .then(res => callback(res));
  };

  onLikeClicked = () => {
    this.setState({
      isLiked: !this.state.isLiked
    });
    const subject = {
      _id: this.props.match.params.id,
      type: "track",
      title: this.state.track.name,
      image:
        this.state.track.album.images.length > 0
          ? this.state.track.album.images[0].url
          : null
    };
    subjectService.likeSubject(subject);
  };

  onCommentLikeClicked = e => {
    const commentId = e.currentTarget.getAttribute("value");
    // console.log(commentId);
    subjectService.likeComment(commentId).then(() => {
      subjectService.findCommentLikesByCurrentUser().then(res => {
        // console.log(res);
        this.setState({
          commentLikes: res
        });
      });

      subjectService
        .findCommentsBySubjectId("album", this.props.match.params.id)
        .then(comments => {
          // console.log("get", comments);
          this.setState({
            comments: comments
          });
        });
    });
  };

  changeLyric = () => {
    subjectService
      .updateSubjectLyricById(this.props.match.params.id, {
        lyric: this.state.lyric,
        type: "track"
      })
      .then(res => this.setState({ editing: !this.state.editing }))
      .catch(err => alert("edit error/ you may not be an editor"));
    // subjectService.updateLyric
  };

  render() {
    return (
      ((this.state.isLoggedIn === true && this.state.loaded === 4) ||
        (this.state.isLoggedIn === false &&
          [1, 4].includes(this.state.loaded))) && (
        <div className="container-fluid">
          <div
            className="background-image"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" +
                this.state.track.album.images[0].url +
                ")"
            }}
          />
          <div className="subject-content mt-md-5 mt-sm-3">
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <h1 className="title">{this.state.track.name}</h1>
                <div>
                  Album:{" "}
                  <Link to={`/album/${this.state.track.album.id}`}>
                    {this.state.track.album.name}
                  </Link>
                </div>
                <div>
                  Artist:{" "}
                  <Link to={`/artist/${this.state.track.artists[0].id}`}>
                    {this.state.track.artists[0].name}
                  </Link>
                </div>
                <div>Released: {this.state.track.album.release_date}</div>
                <div>Popularity: {this.state.track.popularity}/100</div>
                {this.state.displayName !== null ? (
                  <div className="my-2">
                    <button
                      className="btn btn-light"
                      onClick={this.onLikeClicked}
                    >
                      {this.state.isLiked === true ? (
                        <span style={{ color: "#cc0000" }}>
                          <i className="fas fa-heart" />
                        </span>
                      ) : (
                        <span style={{ color: "black" }}>
                          <i className="far fa-heart" />
                        </span>
                      )}
                    </button>
                  </div>
                ) : (
                  <span>
                    <a
                      href="#"
                      style={{ margin: "3px" }}
                      data-toggle="modal"
                      data-target="#login"
                    >
                      Log in to like
                    </a>
                  </span>
                )}
                {this.state.showLyric ? (
                  <h4
                    className="btn btn-light"
                    style={{ cursor: "pointer", margin: "3px" }}
                    onClick={() =>
                      this.setState({ showLyric: !this.state.showLyric })
                    }
                  >
                    hide Lyric
                  </h4>
                ) : (
                  <h4
                    className="btn btn-light"
                    style={{ cursor: "pointer", margin: "3px" }}
                    onClick={() =>
                      this.setState({ showLyric: !this.state.showLyric })
                    }
                  >
                    see/edit Lyric
                  </h4>
                )}

                {this.state.showLyric ? ( //show/hide intro info
                  <div>
                    <p>
                      {!this.state.lyric
                        ? "No lyric yet, you can edit one!"
                        : this.state.lyric}
                    </p>
                    {/* editor view */}
                    {this.state.type !== 2 ? ( //is this user logged in as a type 2?(editor)
                      this.state.isLoggedIn === true ? (
                        <a href={`/profile`} target="_blank">
                          Switch to editor then refresh this page to edit{" "}
                        </a> //is logged in another user type
                      ) : (
                        <a
                          href="#"
                          style={{ margin: "3px" }}
                          data-toggle="modal"
                          data-target="#login"
                        >
                          Login and be an editor to edit{" "}
                        </a>
                      )
                    ) : this.state.editing === true ? (
                      <div>
                        <textarea
                          placeholder="Add an Lyric..."
                          onChange={event =>
                            this.setState({ lyric: event.target.value })
                          }
                          rows="2"
                          value={this.state.lyric}
                          className="form-control"
                        />
                        <button
                          style={{ margin: "2px" }}
                          onClick={this.changeLyric}
                          className="btn btn-light"
                        >
                          {" "}
                          update
                        </button>
                        <button
                          style={{ margin: "2px" }}
                          onClick={() =>
                            this.setState({ editing: !this.state.editing })
                          }
                          className="btn btn-light"
                        >
                          {" "}
                          cancel
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          onClick={() =>
                            this.setState({ editing: !this.state.editing })
                          }
                          style={{ margin: "1px" }}
                          className="btn btn-light"
                        >
                          edit
                        </button>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>

              <div className="col-6 d-none d-md-block">
                <div className="float-right embed-container">
                  <iframe
                    src={
                      "https://embed.spotify.com/?uri=spotify:track:" +
                      this.state.track.id
                    }
                    width="350px"
                    height="350px"
                    frameBorder="0"
                    allowtransparency="true"
                    allow="encrypted-media"
                  />
                </div>
              </div>
            </div>

            <div className="row my-3 d-md-none">
              {/* <div className="col-12">
                <div className="text-center embed-container">
                  <iframe
                    src={
                      "https://embed.spotify.com/?uri=spotify:track:" +
                      this.state.track.id
                    }
                    width="350px"
                    height="350px"
                    frameBorder="0"
                    allowtransparency="true"
                    allow="encrypted-media"
                  />
                </div>
              </div> */}
              {this.state.showLyric ? (
                <p class="text-center" style={{ color: "white" }}>
                  {this.state.lyric}
                </p>
              ) : (
                ""
              )}
            </div>

            <div className="row comments my-md-5 my-sm-3">
              <div className="col">
                <h4>Comment</h4>

                {this.state.displayName !== null ? (
                  <div className="comment-editor my-3">
                    <div className="row mx-1 my-2">
                      <div className="col-auto align-self-center">
                        <img
                          width="50px"
                          height="50px"
                          src={this.state.photo}
                        />
                      </div>
                      <div className="col">
                        <textarea
                          onChange={this.onCommentChanged}
                          className="form-control"
                          id="commentTextarea"
                          rows="2"
                          placeholder="Add a comment..."
                        />
                      </div>
                    </div>

                    <div className="row mx-1 my-2">
                      <div className="col">
                        <div className="float-right">
                          <button
                            onClick={this.onAddClicked}
                            className="btn btn-light"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <a href="#" data-toggle="modal" data-target="#login">
                      Log in to add a comment
                    </a>
                    <hr className="comment-hr" />
                  </div>
                )}

                <h5>Latest comments</h5>
                {this.state.comments.map((comment, i) => (
                  <div className="comment-list-item" key={i}>
                    <hr className="comment-hr" />

                    <div className="row">
                      <div className="col-auto align-self-center">
                        <img
                          width="40px"
                          height="40px"
                          src={
                            comment.user.photo === ""
                              ? "https://northmemorial.com/wp-content/uploads/2016/10/PersonPlaceholder.png"
                              : comment.user.photo
                          }
                        />
                      </div>
                      <div className="col">
                        <Link to={`/user/${comment.user._id}`}>
                          {comment.user.displayName}
                        </Link>
                        : {comment.content}
                        <br />
                        <div className="comment-time">
                          {comment.updatedAt.slice(0, -5).split("T")[0]}
                          &nbsp;
                          {comment.updatedAt.slice(0, -5).split("T")[1]}
                          &nbsp;UTC&nbsp;
                        </div>
                      </div>
                      <div className="col align-self-center">
                        <button
                          className="btn float-right"
                          style={{ fontSize: "18px", color: "white" }}
                          onClick={this.onCommentLikeClicked}
                          value={comment._id}
                        >
                          {comment.likeCount}&nbsp;
                          {this.state.commentLikes
                            .map(x => x._id)
                            .includes(comment._id) ? (
                            <i className="fas fa-thumbs-up" />
                          ) : (
                            <i className="far fa-thumbs-up" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}

export default Track;
