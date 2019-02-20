import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import RouterBoard from './containers/RouterBoard';

ReactDOM.render(
  <div className="container-fluid">
    <RouterBoard />
  </div>,
  document.getElementById("root")
);