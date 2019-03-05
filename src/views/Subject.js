import React, {Component} from 'react';
import {Link} from "react-router-dom";
import '../static/views/background.css';
import SearchService from '../services/SearchService';

let searchService = SearchService.getInstance();

export default class Subject extends Component {
    constructor(props) {
        super(props);
        this.state = {loaded: false};
    }

    // track: { album: { images:
    //     [{url: "https://cdn.pixabay.com/photo/2015/02/22/17/56/loading-645268_1280.jpg"}] }//no internet image
    // }
    componentDidMount() {
        const callback = (res) =>{ this.setState({track: res, loaded: true}); console.log("trackMount", this.state.track) }
        searchService.getTrack(this.props.match.params.id, callback)
    }

    componentWillReceiveProps(nextProps) {
        const callback = (res) =>{ this.setState({track: res}); console.log("trackUpdate", this.state.track) }
        searchService.getTrack(this.props.match.params.id, callback)
    }

  render() {
    return (
        this.state.loaded===true &&
      <div className="container-fluid" style={{padding: "15px"}}>
              <div style={
                  {

                      content: "",
                      position: "fixed",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: -1,

                  display: "block",
                  backgroundImage: 'url('+this.state.track.album.images[0].url+')',
                  backgroundSize: "cover",
                  width: "100%",
                  height: "100%",

                  WebkitFilter: "blur(5px)",
                  MozFilter: "blur(5px)",
                  OFilter: "blur(5px)",
                  MsFilter: "blur(5px)",
                  filter: "blur(5px)",
              }
              } />
              <div className="content">

                  <div className="row">
                      <div className="col-md-4">
                <h3 className="show">Track: {this.state.track.name}</h3>
                      </div>
                      <div className="col-md-4">
                      <div className="show"><b>By:</b> {this.state.track.artists[0].name}</div>
                      <div className="show"><b>Released</b>: {this.state.track.album.release_date}</div>
                      </div>
                  </div>

                <div className="row" style={{margin: "10px"}}>

                    <div className="col-md-4">
                        <div className="show">Loop Album below</div>
                        <iframe src={"https://open.spotify.com/embed/album/"+this.state.track.album.id} width="300px" height="180px" frameborder="0"
                                allowtransparency="true" allow="encrypted-media"></iframe>
                    </div>
                    <div className="col-md-3">
                    </div>

                  <div className="col-md-4 show">

                    <br/>
                    <div ><b>TuneScore</b>: 9.0</div>
                    <div ><b>Reviewed by</b>: 999 TuneSers</div>
                    <Link  to={"/login"}> log in or sign up to review and be a TuneSocializer</Link>
                  </div>


                </div>
                <br/>

                  <div className="show">
                <h4>Comments</h4>

                <div style={{margin: "8px"}}>
                  <Link to={"/user"}>Zexi</Link> scores: 9.8
                  <p> miss MJ ~~~ Jackson has been referred to as the "King of Pop" because, throughout his career, he
                    transformed the art of music videos and paved the way for modern pop music. For much of Jackson's career, he
                    had an unparalleled worldwide influence over the younger generation. His music and videos, such as Thriller,
                    fostered racial diversity in MTV's roster and steered its focus from rock to pop music and R&B, shaping the
                    channel into a form that proved enduring. Jackson's work continues to influence numerous artists of various
                    music genres</p>
                  <button className="btn-secondary"> reply</button>
                </div>
                <div style={{margin: "8px"}}>
                  <Link to={"/user"}>michael yang</Link> scores: 9.9
                  <p> Love this song </p>
                  <button className="btn-secondary"> reply</button>
                </div>
                <div style={{margin: "8px"}}>
                  <Link to={"/user"}>Tao</Link> scores: 9.7
                  <p> Great! </p>
                  <button className="btn-secondary"> reply</button>
                </div>
                  </div>

          </div>
      </div>
    )
  }
}

