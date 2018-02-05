import React from 'react';
import './NotFound.css';
import {Link} from 'react-router-dom';

export default class NotFound extends React.Component {
  render() {
    return (
      <div className="NotFound">
        <h2>NotFound!!!400fucking4</h2>
        <h3>
          <Link to="/">Go to explore</Link>
        </h3>
      </div>
    )
  }
}