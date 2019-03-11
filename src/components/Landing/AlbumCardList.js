import React, { Component } from 'react';

import AlbumCard from '../AlbumCard';

class AlbumCardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: this.props.playlist,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.playlist !== this.state.playlist) {
      this.setState({
        playlist: nextProps.playlist
      });
      console.log(this.state.playlist);
    }
  }

  render() {
    return (
      <div className="row mx-1 d-flex justify-content-center">
        {this.state.playlist.tracks.items.slice(1, 9).map(track => {
          return (
            <AlbumCard track={track} key={track.track.album.id} />
          );
        })}
      </div>
    );
  }
}

export default AlbumCardList;
