import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Yangframe extends Component {
  render() {
    return (
      <div>
        {/* <div className="row">

            <div className="col-6">
            <img src="https://media.licdn.com/dms/image/C4E03AQEI_Eu3rLYYeA/profile-displayphoto-shrink_200_200/0?e=1560988800&v=beta&t=u_ZneTnGOwyEbstsm_CbUtLLd4BIAwWXOIq9PpsNky0"></img>
            <Link style={{color: "blue"}} to="/user/82i0hjusbye4l19l94bww4i02">Zhongheng Yang</Link>
            <div>yang.zho@husky.neu.edu</div>
            </div>

            <div className="col-6">
            <img src="https://media.licdn.com/dms/image/C4E03AQHXSqn7Vzi23Q/profile-displayphoto-shrink_800_800/0?e=1560988800&v=beta&t=WgUdU0qc13qT7YnwR3RBg9vbDto0GhqAgifa-SQ3H2Q"></img>
            <Link style={{color: "blue"}} to="/user/zexihan">Zexi Han</Link>
            <div>zexihan@outlook.com</div>
            </div>
            
            <div className="col-6">
            <img src="https://picsum.photos/200"></img>
            <Link style={{color: "blue"}} to="/user/5els3kmgvakg7bj6vqzmkc2wb">Tao Ouyang</Link>
            <div>ouyang.ta@husky.neu.edu</div>
            </div>

            </div> */}
        <div className="card-deck" style={{ margin: "4" }}>
          <div
            className="card"
            style={{ margin: "4px", minWidth: "200px", maxWidth: "200px" }}
          >
            <img
              alt="img"
              className="card-img-top"
              src="https://media.licdn.com/dms/image/C4E03AQHXSqn7Vzi23Q/profile-displayphoto-shrink_800_800/0?e=1560988800&v=beta&t=WgUdU0qc13qT7YnwR3RBg9vbDto0GhqAgifa-SQ3H2Q"
            />
            <div className="card-body">
              <div className="card-title">
                <form>
                  <Link to="/user/zexihan">
                    <button
                      className="form-control btn btn-primary"
                      style={{ overflow: "hidden", whiteSpace: "nowrap" }}
                    >
                      Zexi Han
                    </button>
                  </Link>
                </form>
              </div>
              <div className="card-text">
                <p style={{ whiteSpace: "nowrap" }}>zexihan@outlook.com</p>
              </div>
              {/*<i className="fa fa-times fa-3x btn card-text" onClick={this.deleteCourse}></i>*/}
            </div>
          </div>

          <div
            className="card"
            style={{ margin: "4px", minWidth: "200px", maxWidth: "200px" }}
          >
            <img
              alt="img"
              className="card-img-top"
              src="https://media.licdn.com/dms/image/C4E03AQEI_Eu3rLYYeA/profile-displayphoto-shrink_200_200/0?e=1560988800&v=beta&t=u_ZneTnGOwyEbstsm_CbUtLLd4BIAwWXOIq9PpsNky0"
            />
            <div className="card-body">
              <div className="card-title">
                <form>
                  <Link to="/user/82i0hjusbye4l19l94bww4i02">
                    <button
                      className="form-control btn btn-primary"
                      style={{ overflow: "hidden", whiteSpace: "nowrap" }}
                    >
                      Zhongheng Yang
                    </button>
                  </Link>
                </form>
              </div>
              <div className="card-text">
                <p style={{ whiteSpace: "nowrap" }}>yang.zho@husky.neu.edu</p>
              </div>
              {/*<i className="fa fa-times fa-3x btn card-text" onClick={this.deleteCourse}></i>*/}
            </div>
          </div>

          <div
            className="card"
            style={{ margin: "4px", minWidth: "200px", maxWidth: "200px" }}
          >
            <img
              alt="img"
              className="card-img-top"
              src="https://picsum.photos/200"
            />
            <div className="card-body">
              <div className="card-title">
                <form>
                  <Link to="/user/5els3kmgvakg7bj6vqzmkc2wb">
                    <button
                      className="form-control btn btn-primary"
                      style={{ overflow: "hidden", whiteSpace: "nowrap" }}
                    >
                      Tao Ouyang
                    </button>
                  </Link>
                </form>
              </div>
              <div className="card-text">
                <p style={{ whiteSpace: "nowrap" }}>ouyang.ta@husky.neu.edu</p>
              </div>
              {/*<i className="fa fa-times fa-3x btn card-text" onClick={this.deleteCourse}></i>*/}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
