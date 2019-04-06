import React from "react";
import { Link } from "react-router-dom";

const ItemList = ({ subjectLikes }) => {
  console.log(subjectLikes);
  return subjectLikes.map(like => (
    <div className="col my-1 w-sm-2 w-md-3 w-lg-4 d-flex justify-content-center" key={like._id}>
      <div className="card">
        <Link to={`/${like.subject.type}/${like.subject._id}`}>
          <img src={like.subject.image} className="card-img-top" alt="..." />
        </Link>
        <div className="card-body">
          <Link to={`/${like.subject.type}/${like.subject._id}`}>
            <p className="card-text albumcard-album">{like.subject.title}</p>
          </Link>
        </div>
      </div>
    </div>
  ));
};

export default ItemList;