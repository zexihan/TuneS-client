import React from 'react';

import '../static/components/ArtistCard.css';

const ArtistCard = ({track}) => {
  console.log(track.track);
  var imageURL = "https://newmusicshelf.com/wp-content/uploads/blank-profile-picture.png";
  // if (subject.images && subject.images.length) {
  //   imageURL = subject.images[0].url;
  // }
  return (
    <div className="card mx-3 my-3">
      <img src={imageURL} className="card-img-top" alt="..."/>
      <div className="card-body">
        <p className="card-text artistcard-artist">Artist</p>
        <p className="card-text artistcard-genre">Genre</p>
      </div>
    </div>
  );
}

export default ArtistCard;
