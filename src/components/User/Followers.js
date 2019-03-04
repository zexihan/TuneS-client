import React from "react";

const Followers = props => {
  const followers = props.followers.map(follower => (
    <div key={follower.id}>follower.title</div>
  ));
  return <div>{followers}</div>;
};

export default Followers;
