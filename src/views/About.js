import React from "react";
import { Link } from "react-router-dom";

import "../static/views/About.css";

const About = () => (
  <div className="container-fluid">
    <div className="row mt-5 justify-content-center align-self-center">
      <div className="col mt-5 text-center about-title">Nice to meet you</div>
    </div>
    <div className="row mx-2 mt-3 mb-5 justify-content-center align-self-center">
      <div className="col-12 col-lg-10">
        <div className="card-deck text-center">
          <div className="card border-0 shadow about-card m-2">
            <img src={`/images/avatar1.png`} className="card-img-top" />
            <div className="card-body text-center">
              <h5 className="card-title mb-0">
              <Link to="/profile/mhfgbldv754yj6w3mp233viye">Zhongheng Yang</Link></h5>
              <div className="card-text text-black-50">
              </div>
              <hr className="about-hr" />
              <div className="card-text email">yang.zho@husky.neu.edu</div>
            </div>
          </div>

          <div className="card border-0 shadow about-card m-2">
            <img src={`/images/avatar2.png`} className="card-img-top" />
            <div className="card-body text-center">
              <h5 className="card-title mb-0">Zexi Han</h5>
              <div className="card-text text-black-50">Software Engineer</div>
              <hr className="about-hr" />
              <div className="card-text email">zexihan@outlook.com</div>
            </div>
          </div>

          <div className="card border-0 shadow about-card m-2">
            <img src={`/images/avatar3.png`} className="card-img-top" />
            <div className="card-body text-center">
              <h5 className="card-title mb-0">Tao Ouyang</h5>
              <div className="card-text text-black-50">Software Engineer</div>
              <hr className="about-hr" />
              <div className="card-text email">ouyang.ta@husky.neu.edu</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  // <div>
  //   {/* <div className="row">

  //       <div className="col-6">
  //       <img src="https://media.licdn.com/dms/image/C4E03AQEI_Eu3rLYYeA/profile-displayphoto-shrink_200_200/0?e=1560988800&v=beta&t=u_ZneTnGOwyEbstsm_CbUtLLd4BIAwWXOIq9PpsNky0"></img>
  //       <Link style={{color: "blue"}} to="/profile/82i0hjusbye4l19l94bww4i02">Zhongheng Yang</Link>
  //       <div>yang.zho@husky.neu.edu</div>
  //       </div>

  //       <div className="col-6">
  //       <img src="https://media.licdn.com/dms/image/C4E03AQHXSqn7Vzi23Q/profile-displayphoto-shrink_800_800/0?e=1560988800&v=beta&t=WgUdU0qc13qT7YnwR3RBg9vbDto0GhqAgifa-SQ3H2Q"></img>
  //       <Link style={{color: "blue"}} to="/profile/zexihan">Zexi Han</Link>
  //       <div>zexihan@outlook.com</div>
  //       </div>

  //       <div className="col-6">
  //       <img src="https://picsum.photos/200"></img>
  //       <Link style={{color: "blue"}} to="/profile/5els3kmgvakg7bj6vqzmkc2wb">Tao Ouyang</Link>
  //       <div>ouyang.ta@husky.neu.edu</div>
  //       </div>

  //       </div> */}
  //   <div className="card-deck" style={{ margin: "4" }}>
  //     <div
  //       className="card"
  //       style={{ margin: "4px", minWidth: "200px", maxWidth: "200px" }}
  //     >
  //       <img
  //         alt="img"
  //         className="card-img-top"
  //         src="https://media.licdn.com/dms/image/C4E03AQHXSqn7Vzi23Q/profile-displayphoto-shrink_800_800/0?e=1560988800&v=beta&t=WgUdU0qc13qT7YnwR3RBg9vbDto0GhqAgifa-SQ3H2Q"
  //       />
  //       <div className="card-body">
  //         <div className="card-title">
  //           <form>
  //             <Link to="/profile/zexihan">
  //               <button
  //                 className="form-control btn btn-primary"
  //                 style={{ overflow: "hidden", whiteSpace: "nowrap" }}
  //               >
  //                 Zexi Han
  //               </button>
  //             </Link>
  //           </form>
  //         </div>
  //         <div className="card-text">
  //           <p style={{ whiteSpace: "nowrap" }}>zexihan@outlook.com</p>
  //         </div>
  //         {/*<i className="fa fa-times fa-3x btn card-text" onClick={this.deleteCourse}></i>*/}
  //       </div>
  //     </div>

  //     <div
  //       className="card"
  //       style={{ margin: "4px", minWidth: "200px", maxWidth: "200px" }}
  //     >
  //       <img
  //         alt="img"
  //         className="card-img-top"
  //         src="https://media.licdn.com/dms/image/C4E03AQEI_Eu3rLYYeA/profile-displayphoto-shrink_200_200/0?e=1560988800&v=beta&t=u_ZneTnGOwyEbstsm_CbUtLLd4BIAwWXOIq9PpsNky0"
  //       />
  //       <div className="card-body">
  //         <div className="card-title">
  //           <form>
  //             <Link to="/profile/82i0hjusbye4l19l94bww4i02">
  //               <button
  //                 className="form-control btn btn-primary"
  //                 style={{ overflow: "hidden", whiteSpace: "nowrap" }}
  //               >
  //                 Zhongheng Yang
  //               </button>
  //             </Link>
  //           </form>
  //         </div>
  //         <div className="card-text">
  //           <p style={{ whiteSpace: "nowrap" }}>yang.zho@husky.neu.edu</p>
  //         </div>
  //         {/*<i className="fa fa-times fa-3x btn card-text" onClick={this.deleteCourse}></i>*/}
  //       </div>
  //     </div>

  //     <div
  //       className="card"
  //       style={{ margin: "4px", minWidth: "200px", maxWidth: "200px" }}
  //     >
  //       <img
  //         alt="img"
  //         className="card-img-top"
  //         src="https://picsum.photos/200"
  //       />
  //       <div className="card-body">
  //         <div className="card-title">
  //           <form>
  //             <Link to="/profile/5els3kmgvakg7bj6vqzmkc2wb">
  //               <button
  //                 className="form-control btn btn-primary"
  //                 style={{ overflow: "hidden", whiteSpace: "nowrap" }}
  //               >
  //                 Tao Ouyang
  //               </button>
  //             </Link>
  //           </form>
  //         </div>
  //         <div className="card-text">
  //           <p style={{ whiteSpace: "nowrap" }}>ouyang.ta@husky.neu.edu</p>
  //         </div>
  //         {/*<i className="fa fa-times fa-3x btn card-text" onClick={this.deleteCourse}></i>*/}
  //       </div>
  //     </div>
  //   </div>
  // </div>
);

export default About;