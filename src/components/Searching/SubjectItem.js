import React from 'react';
import { Link } from 'react-router-dom';
//subject: json.items[0]
import '../../static/components/SubjectItem.css';

const SubjectItem = ({subject, type}) => {
  switch (type) {
    case "track": {
      var imageURL = "https://carwad.net/sites/default/files/pics-of-musical-notes-146477-1383627.png";
      if (subject.album.images && subject.album.images.length) {
        imageURL = subject.album.images[0].url;
      }
      return (
        <div className="row my-3">
          <div className="col-auto">
            <img className="subject-image" src={imageURL} />
          </div>
          <div className="col m-2">
            <div className="row mb-3">
              <Link to={`/${type}/${subject.id}`} className="subject-title">{subject.name}</Link>
            </div>
            <div className="row">
              <p className="subject-pop">{subject.popularity}</p>
            </div>
            <div className="row">
              <p className="subject-detail">{subject.artists[0].name} / {subject.album.release_date}</p>
            </div>
          </div>
        </div>
      );
    }
    case "artist": {
      var imageURL = "https://newmusicshelf.com/wp-content/uploads/blank-profile-picture.png";
      var followers = 0;
      if (subject.images && subject.images.length) {
        imageURL = subject.images[0].url;
      }
      if (subject.followers !== undefined) {
        followers = subject.followers.total;
      }
      return (
        <div className="row my-3">
          <div className="col-auto">
            <img className="subject-image" src={imageURL}/>
          </div>
          <div className="col m-2">
            <div className="row mb-3">
              <Link to={`/${type}/${subject.id}`} className="subject-title">{subject.name}</Link>
            </div>
            <div className="row">
              <p className="subject-pop">Followers: {followers}</p>
            </div>
          </div>
        </div>
      );
    }
    case "album": {
      var imageURL = "https://us.123rf.com/450wm/luplupme/luplupme1606/luplupme160600492/58500023-vinyl-lp-lp-album-disc-isoliert-lange-spiel-vinyl-scheibe-mit-leeren-orangefarbenen-etikett-vektor-v.jpg?ver=6";
      if (subject.images && subject.images.length) {
        imageURL = subject.images[0].url;
      }
      return (
        <div className="row my-3">
          <div className="col-auto">
            <img className="subject-image" src={imageURL}/>
          </div>
          <div className="col m-2">
            <div className="row mb-3">
              <Link to={`/${type}/${subject.id}`} className="subject-title">{subject.name}</Link>
            </div>
            <div className="row">
              <p className="subject-pop">{subject.popularity}</p>
            </div>
            <div className="row">
              <p className="subject-detail">{subject.artists[0].name} / {subject.release_date}</p>
            </div>
          </div>
        </div>
      );
    }
  }

}

export default SubjectItem;
