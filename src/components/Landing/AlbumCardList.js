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
      <div className="row mx-1 my-2">
        {this.state.playlist !== undefined ? this.state.playlist.tracks.items
          .slice(10, 20)
          .map((track, i) => {
            return (
              <div className="col my-1 w-sm-2 w-md-3 w-lg-4 d-flex justify-content-center" key={i}>
                <AlbumCard
                  track={track}
                  key={track.track.album.id}
                />
              </div>
            );
          }) : null}
      </div>
    );
  }
}

export default AlbumCardList;
