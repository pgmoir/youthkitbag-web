import React from 'react';
import { Link } from 'react-router-dom';

const MarketAnnouncement = ({ group, doNotShow }) => {
  // if (!group || !doNotShow) return null;

  return (
    <article className="tile is-child notification is-danger">
      <p className="title">Market watches</p>
      <div className="content">
        <p>You have received responses to your trade offers.</p>
      </div>
      <div className="buttons">
        <Link className="button is-danger is-inverted" to="/market">
          Check the market
        </Link>
      </div>
    </article>
  );
};

export default MarketAnnouncement;
