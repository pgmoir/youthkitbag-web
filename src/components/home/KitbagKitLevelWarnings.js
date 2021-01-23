import React from 'react';
import { Link } from 'react-router-dom';

const KitbagKitLevelWarnings = ({ kitbagId, doNotShow }) => {
  // if (!kitbagId || !doNotShow) return null;

  return (
    <article className="tile is-child notification is-danger">
      <p className="title">Kit level warnings</p>
      <div className="content">
        <p>
          You have the following items at warning level. Please order new stock
          to ensure you&apos;re not caught out.
        </p>
      </div>
      <div className="buttons">
        <Link className="button is-danger is-inverted" to="/kitbag">
          Go to kitbag
        </Link>
      </div>
    </article>
  );
};

export default KitbagKitLevelWarnings;
