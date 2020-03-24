import React from 'react';
import { Link } from 'react-router-dom';

const KitbagKitAnnouncement = ({ accountId }) => {
  //TODO: This needs coding - just dont show for now
  return null;

  if (!accountId) return null;

  return (
    <div className="card border-0">
      <div className="alert alert-warning mb-0" role="alert">
        <h2 className="alert-heading">Kitbag activity</h2>
        <hr />
        <p>
          The following items have recently been added, edited or traded in your
          kitbag.
        </p>
        <Link className="btn btn-warning" to={`/kitbag/kit/${accountId}`}>
          View kitbag
        </Link>
      </div>
    </div>
  );
};

export default KitbagKitAnnouncement;
