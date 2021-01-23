import React from 'react';
import { Link } from 'react-router-dom';

/* 
  For users that have neither set up an kitbag, or do not belong to an kitbag, then 
  we recommend setting up or joining one.
*/
const KitbagAnnouncement = ({ kitbagId }) => {
  // if (kitbagId) return null;

  return (
    <article className="tile is-child notification is-primary">
      <p className="title">Get started</p>
      <p className="subtitle">Make the most of YouthKitbag</p>
      <div className="content">
        <p>
          To make the most of YouthKitbag you will need to create a kitbag to
          keep track of all the kit you have and want to trade.
        </p>
        <p>
          You can either set one up for just yourself, or for your family, or
          there may be one you&apos;d like to join.
        </p>
      </div>
      <div className="buttons">
        <Link className="button is-primary is-inverted" to="/kitbags/new">
          Create a kitbag
        </Link>
        <Link
          className="button is-primary is-inverted is-outlined"
          to="/kitbags/join"
        >
          Join a kitbag
        </Link>
      </div>
    </article>
  );
};

export default KitbagAnnouncement;
