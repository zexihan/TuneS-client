import React from 'react';
import { Link } from 'react-router-dom';
//subject: json.items[0]
import '../../static/components/SubjectItem.css';

const SubjectItem = ({subject, type}) => (
  <div className="row my-3">
    <div className="col-auto">
      <img className="subject-image" src={subject.album.images[0].url} />
    </div>
    <div className="col m-2">
      <div className="row mb-3">
        <Link to={`/subject/${type}/${subject.id}`} className="subject-title">{subject.name}</Link>
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

export default SubjectItem;
