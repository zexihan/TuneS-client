import React from "react";

const Posts = props => {
  const posts = props.posts.map(post => (
    <div key={post.id}>
      <strong>{post.title}</strong>
      <p>{post.text}</p>
    </div>
  ));
  return <div>{posts}</div>;
};

export default Posts;