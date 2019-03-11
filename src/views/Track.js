import React, { Component } from 'react';
import { Link } from "react-router-dom";

import '../static/views/Subject.css';

import SearchService from '../services/SearchService';
let searchService = SearchService.getInstance();

class Track extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loaded: false,
          track: {}
        };
    }

    // track: { album: { images:
    //     [{url: "https://cdn.pixabay.com/photo/2015/02/22/17/56/loading-645268_1280.jpg"}] }//no internet image
    // }
    componentDidMount() {
        const callback = (res) => {
          this.setState({track: res, loaded: true});
          console.log("trackMount", this.state.track)
        };
        searchService.getSubject("track", this.props.match.params.id, callback)
    }

    componentWillReceiveProps(nextProps) {
        const callback = (res) => {
          this.setState({track: res});
          console.log("trackUpdate", this.state.track)
        };
        searchService.getSubject("track", this.props.match.params.id, callback)
    }

  render() {
    return (
      this.state.loaded === true &&
      <div className="container-fluid">
        <div className="background-image" style={{backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(' + this.state.track.album.images[0].url + ')'}} />
        <div className="content subject-content mt-5">
          <div className="row">
            <div className="col-6">
              <h1 className="title">{this.state.track.name}</h1>
              <div>Album: <Link to={`/album/${this.state.track.album.id}`}>{this.state.track.album.name}</Link></div>
              <div>Artist: <Link to={`/artist/${this.state.track.artists[0].id}`}>{this.state.track.artists[0].name}</Link></div>
              <div>Released: {this.state.track.album.release_date}</div>
              <div>Popularity: {this.state.track.popularity}/100</div>
              <div>Reviewed by: 0 TuneSers</div>
              <div><Link to={"/login"}>Log in</Link> or <Link to={"/login"}>sign up</Link> to review</div>
            </div>
            <div className="col-6">
              <div className='float-right embed-container'>
                <iframe src={"https://embed.spotify.com/?uri=spotify:track:" + this.state.track.id}
                        width="350px" height="350px" frameBorder="0" allowtransparency="true" allow="encrypted-media"/>
              </div>
            </div>
          </div>

          <div className="row comments my-5">
            <div className="col">
              <div className="row mb-2">
                <div className="col">
                  <h4>Comments</h4>
                </div>
                <div className="col">
                  <div className="float-right">
                    <button className="btn btn-dark"><i className="fas fa-pen"></i> Reply</button>
                  </div>
                </div>
              </div>
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

export default Track;

