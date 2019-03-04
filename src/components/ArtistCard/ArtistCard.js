import React from "react";

import "./ArtistCard.css";

const ArtistCard = () => (
  <div className="card col-2 ml-3 my-1">
    <img
      src="https://i.scdn.co/image/21303055050d3fd59b398c9fbe04c94250cc8246"
      className="card-img-top"
      alt="..."
    />
    <div className="card-body">
      <p className="card-text artistcard-artist">Artist</p>
      <p className="card-text artistcard-genre">Genre</p>
    </div>
  </div>
);

export default ArtistCard;
