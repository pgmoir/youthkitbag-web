import React from 'react';
import { Link } from 'react-router-dom';

const MarketAnnouncement = ({ group, doNotShow }) => {
  if (!group || !doNotShow) return null;

  return (
    <article className="notification is-notification-even is-info box">
      <h2 className="title">Market watches</h2>
      <div className="content">
        <p>You have received responses to your trade offers.</p>
      </div>
      <div className="buttons">
        <Link className="button is-info is-inverted" to="/market">
          Check the market
        </Link>
      </div>
    </article>
  );
};

export default MarketAnnouncement;
