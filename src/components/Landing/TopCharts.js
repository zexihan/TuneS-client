import React from 'react';
import { Link } from "react-router-dom";

import '../../static/components/TopCharts.css';

const TopCharts = ({ topTracks, topAlbums, topArtists }) => (
  <div>
    <ul className="nav nav-pills mb-2" id="pills-tab" role="tablist">
      <li className="nav-item">
        <a
          className="nav-link active"
          id="pills-tracks-tab"
          data-toggle="pill"
          href="#pills-tracks"
          role="tab"
          aria-selected="true"
        >
          Track
        </a>
      </li>
      <li className="nav-item">
        <a
          className="nav-link"
          id="pills-albums-tab"
          data-toggle="pill"
          href="#pills-albums"
          role="tab"
          aria-selected="false"
        >
          Album
        </a>
      </li>
      <li className="nav-item">
        <a
          className="nav-link"
          id="pills-artists-tab"
          data-toggle="pill"
          href="#pills-artists"
          role="tab"
          aria-selected="false"
        >
          Artist
        </a>
      </li>
    </ul>
    <div className="tab-content" id="pills-tabContent">
      <div
        className="tab-pane fade show active"
        id="pills-tracks"
        role="tabpanel"
        aria-labelledby="pills-tracks-tab"
      >
        <table className="table table-borderless table-hover-rows">
          <tbody>
            {topTracks.map((track, i) => (
              <tr key={i}>
                <td>
                  <Link to={`/track/${track._id}`} className="top-item">
                    {track.title}
                  </Link>
                </td>
                <td className="ranking">{i + 1}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        className="tab-pane fade"
        id="pills-albums"
        role="tabpanel"
        aria-labelledby="pills-albums-tab"
      >
        <table className="table table-borderless table-hover-rows">
          <tbody>
            {topAlbums.map((album, i) => (
              <tr key={i}>
                <td>
                  <Link to={`/album/${album._id}`} className="top-item">
                    {album.title}
                  </Link>
                </td>
                <td className="ranking">{i + 1}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className="tab-pane fade"
        id="pills-artists"
        role="tabpanel"
        aria-labelledby="pills-artists-tab"
      >
        <table className="table table-borderless table-hover-rows">
          <tbody>
            {topArtists.map((artist, i) => (
              <tr key={i}>
                <td>
                  <Link to={`/artist/${artist._id}`} className="top-item">
                    {artist.title}
                  </Link>
                </td>
                <td className="ranking">{i + 1}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default TopCharts;
