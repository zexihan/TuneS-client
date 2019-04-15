import React from "react";
import { Link } from "react-router-dom";

import "../../static/components/CommentList.css";

const CommentList = ({ comments, deleteComment, isMyself }) => {
  if(!deleteComment){
  for (let i in comments){
    console.log('like')
    console.log('likes',comments[i])}}
  else{
    for (let i in comments){
      console.log('nonlike')
      console.log('nonlikes',comments[i].subject)}
  }
  return (
    <div className="col">
      {comments.map(comment => (
        <div key={comment._id}>
          <div className="comment-content">"{comment.content}"</div>
          <div className="comment-info" align="right">
            <i>
              &mdash;{" "}
              {comment.subject.type.charAt(0).toUpperCase() +
                comment.subject.type.slice(1)}
              ,&nbsp;
              <Link to={`/${comment.subject.type}/${comment.subject._id}`}>
                {comment.subject.title}
              </Link>
              &nbsp;&nbsp;
              {deleteComment && isMyself && (
                <a
                  href=""
                  onClick={(event) => {event.preventDefault();deleteComment(comment._id)}}
                >
                  <u id="dotted">delete</u>
                </a>
              )}
            </i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
