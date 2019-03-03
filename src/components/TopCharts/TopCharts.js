import React from 'react';

import './TopCharts.css';

const TopCharts = () => (
  <div>
    <ul className="nav nav-pills mb-2" id="pills-tab" role="tablist">
      <li className="nav-item">
        <a className="nav-link active" id="pills-songs-tab" data-toggle="pill" href="#pills-songs" role="tab"
           aria-selected="true">Songs</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" id="pills-albums-tab" data-toggle="pill" href="#pills-albums" role="tab"
           aria-selected="false">Albums</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" id="pills-artists-tab" data-toggle="pill" href="#pills-artists" role="tab"
           aria-selected="false">Artists</a>
      </li>
    </ul>
    <div className="tab-content" id="pills-tabContent">
      <div className="tab-pane fade show active" id="pills-songs" role="tabpanel" aria-labelledby="pills-songs-tab">
        <table className="table table-borderless table-hover-rows">
          <tbody>
          <tr>
            <td>Murder on My Mind</td>
            <td className="ranking">1</td>
          </tr>
          <tr>
            <td>MIDDLE CHILD</td>
            <td className="ranking">2</td>
          </tr>
          <tr>
            <td>Sucker</td>
            <td className="ranking">3</td>
          </tr>
          <tr>
            <td>Girls Need Love (Remix)</td>
            <td className="ranking">4</td>
          </tr>
          <tr>
            <td>Going Bad</td>
            <td className="ranking">5</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div className="tab-pane fade" id="pills-albums" role="tabpanel" aria-labelledby="pills-albums-tab">
        ...
      </div>

      <div className="tab-pane fade" id="pills-artists" role="tabpanel" aria-labelledby="pills-artists-tab">
        ...
      </div>
    </div>
  </div>

);

export default TopCharts;
