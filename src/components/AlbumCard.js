import React from 'react';
import { Link } from "react-router-dom";

import '../static/components/AlbumCard.css';

const AlbumCard = ({track}) => {
  var imageURL = "https://us.123rf.com/450wm/luplupme/luplupme1606/luplupme160600492/58500023-vinyl-lp-lp-album-disc-isoliert-lange-spiel-vinyl-scheibe-mit-leeren-orangefarbenen-etikett-vektor-v.jpg?ver=6";
  if (track.track.album.images && track.track.album.images.length) {
    imageURL = track.track.album.images[0].url;
  }
  return (
    <div className="card m-sm-2 m-md-3">
      <Link to={`/album/${track.track.album.id}`}><img src={imageURL} className="card-img-top" alt="..."/></Link>
      <div className="card-body">
        <Link to={`/album/${track.track.album.id}`}><p className="card-text albumcard-album">{track.track.album.name}</p></Link>
        <Link to={`/artist/${track.track.artists[0].id}`}><p className="card-text albumcard-artist">{track.track.artists[0].name}</p></Link>
      </div>
    </div>
  );
}

export default AlbumCard;
