import React from 'react';
import { Link } from 'react-router-dom';

const MarketAnnouncement = ({ group, doNotShow }) => {
  // if (!group || !doNotShow) return null;

  return (
    <article className="tile is-child notification is-danger">
      <h2 className="title">Market watches</h2>
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
