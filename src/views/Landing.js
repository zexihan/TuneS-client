import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';

import '../static/views/Landing.css';

import AlbumCard from '../components/AlbumCard';
import ArtistCard from '../components/ArtistCard';
import TopCharts from '../components/Landing/TopCharts';
import SearchService from '../services/SearchService';

let searchService = SearchService.getInstance();

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    };
  }

  search = async () => {
    console.log("search");
    let resList = await searchService.query(this.state.searchText);
  }

  searchFieldChanged = (event) => {
    console.log(event.target.value);
    this.setState({
      searchText: event.target.value
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row pt-5 pb-4" id="search-area">
          <div className="col-4 text-right">
            <h1 id="brand">TuneS</h1>
          </div>
          <div className="col-8">
            <div className="input-group my-2">
              <input type="text" id="search" className="form-control" placeholder="Search..." onChange={this.searchFieldChanged} />
              <div className="input-group-append">
                <Link to={{pathname: "/subject_search", search: "?query=" + this.state.searchText}}>
                  <button className="btn btn-outline-secondary" type="button" onClick={this.search}>
                    <i className="fas fa-search" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <hr className="search-hr"/>

        <div className="row navs py-1">
          <div className="col">
            <ul className="nav justify-content-center">
              <li className="nav-item">
                <a className="nav-link" href="#">New Music</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Playlists</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Music Videos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Top Charts</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Genres</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="row content my-3">
          <div className="col-9 left-area">




            <div className="row adv-1 my-4">
              <div className="col">
                <div className="adv-1-content">
                  <Carousel autoPlay={true} dynamicHeight={true} showThumbs={false}>
                    <div>
                      <img className="center-cropped" src="https://i.ytimg.com/vi/6zTc2hD2npA/maxresdefault.jpg" />
                    </div>
                    <div>
                      <img className="center-cropped" src="https://images.wallpaperscraft.com/image/people_hands_concert_music_crowd_80452_1920x1080.jpg" />
                    </div>
                  </Carousel>
                </div>
              </div>
            </div>
            <div className="row adv-2 my-4">
              <div className="col">
                <h5>Albums</h5>
                <hr className="left-hr" />
                <div className="adv-2-content">
                  <div className="row mx-1">
                    <AlbumCard />
                    <AlbumCard />
                    <AlbumCard />
                    <AlbumCard />
                    <AlbumCard />
                  </div>

                </div>
              </div>
            </div>
            <div className="row adv-3 my-4">
              <div className="col">
                <h5>Artists</h5>
                <hr className="left-hr" />
                <div className="adv-3-content">
                  <div className="row mx-1">
                    <ArtistCard />
                    <ArtistCard />
                    <ArtistCard />
                    <ArtistCard />
                    <ArtistCard />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3 right-area">
            <div className="row side-1">
              <div className="col">
                <table className="table table-borderless text-center">
                  <tbody>
                  <tr>
                    <td>0<br/>Artists</td>
                    <td>0<br/>Companies</td>
                    <td>0<br/>Members</td>
                  </tr>
                  <tr>
                    <td colSpan="3"><button className="btn btn-primary btn-block">JOIN NOW</button></td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="row side-2 my-3">
              <div className="col">
                <h6>Hot Genres</h6>
                <hr />
                <table className="table table-borderless table-hover-cells">
                  <tbody>
                  <tr>
                    <td>Blues</td>
                    <td>Classical</td>
                  </tr>
                  <tr>
                    <td>Country</td>
                    <td>Dance</td>
                  </tr>
                  <tr>
                    <td>Electronic</td>
                    <td>Jazz</td>
                  </tr>
                  <tr>
                    <td>Pop</td>
                    <td>Rock</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row side-3">
              <div className="col">
                <h6>Top Charts</h6>
                <hr />
                <TopCharts />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
