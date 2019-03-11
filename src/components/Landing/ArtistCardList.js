import React, { Component } from 'react';

import ArtistCard from '../ArtistCard';

class ArtistCardList extends Component {
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
      <div className="row mx-1">
        {this.state.playlist.tracks.items.slice(1, 9).map(track => {
          return (
            <ArtistCard track={track} key={track.track.artists[0].id} />
          );
        })}
      </div>
    );
  }
}

export default ArtistCardList;
