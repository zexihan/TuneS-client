import React, {Component} from 'react';
import {Link} from "react-router-dom";

class SubjectPage extends Component {
  render() {
    return (
      <div className="container-fluid" style={{padding: "15px"}}>
        <h1>Earth Song</h1>

        <div className="row">
          <div className="col-sm-6">
            <img style={{maxWidth: "300px", maxHeight: "300px"}}
                 src={"https://img3.doubanio.com/view/subject/m/public/s3861960.jpg"} />
          </div>

          <div className="col-sm-6">
            <div><b>Artist:</b> Michael Jackson</div>
            <div><b>Released on</b>: Jun 6, 1996</div>
            <br/>
            <div><b>TuneScore</b>: 9.0</div>
            <div><b>Reviewed by</b>: 999 TuneSocializers</div>
            <Link to={"/login"}> log in or sign up to review and be a TuneSocializer</Link>
          </div>


        </div>
        <br/>

        <h2>Comments</h2>

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
    )
  }
}

export default SubjectPage;
