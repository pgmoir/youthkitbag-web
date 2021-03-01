import React from 'react';
import { Link } from 'react-router-dom';

const KitbagKitLevelWarnings = ({ kitbagId }) => {
  if (!kitbagId) return null;

  return (
    <article className="notification is-danger box">
      <h2 className="title">Kit level warnings</h2>
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
