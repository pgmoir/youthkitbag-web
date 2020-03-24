import React from 'react';
import { Link } from 'react-router-dom';

const KitbagKitLevelWarnings = ({ accountId }) => {
  //TODO: This needs coding - just dont show for now
  return null;

  if (!accountId) return null;

  return (
    <div className="card border-0">
      <div className="alert alert-danger mb-0" role="alert">
        <h2 className="alert-heading">Kit level warnings</h2>
        <hr />
        <p>
          You have the following items at warning level. Please order new stock
          to ensure you&apos;re not caught out.
        </p>
        <Link className="btn btn-danger" to="/kitbag">
          Go to kitbag
        </Link>
      </div>
    </div>
  );
};

export default KitbagKitLevelWarnings;
