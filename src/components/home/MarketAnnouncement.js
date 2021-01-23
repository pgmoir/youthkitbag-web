import React from 'react';
import { Link } from 'react-router-dom';

const MarketAnnouncement = ({ group, doNotShow }) => {
  // if (!group || !doNotShow) return null;

  return (
    <article className="tile is-child">
      <h2 className="title is-4">Market watches</h2>
      <p>You have received responses to your trade offers.</p>
      <div className="buttons">
        <Link className="button is-info" to="/market">
          Check the market
        </Link>
      </div>
    </article>
  );
};

export default MarketAnnouncement;
