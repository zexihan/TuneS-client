import React from 'react';

import '../static/components/AlbumCard.css';

const AlbumCard = () => (
  <div className="card mx-3 my-3">
    <img src="https://blog.spoongraphics.co.uk/wp-content/uploads/2017/album-art/8.jpg" className="card-img-top" alt="..." />
    <div className="card-body">
      <p className="card-text albumcard-album">Album</p>
      <p className="card-text albumcard-artist">Artist</p>
    </div>
  </div>
);

export default AlbumCard;
