import React from 'react';
import { Link } from 'react-router-dom';

const KitbagKitAnnouncement = ({ accountId }) => {
  function renderBlock() {
    return (
      <div className="card border-0">
        <div className="alert alert-warning mb-0" role="alert">
          <h4 className="alert-heading">Kitbag activity</h4>
          <hr />
          <p>
            The following items have recently been added, edited or traded in
            your kitbag.
          </p>
          <Link className="btn btn-warning" to={`/kitbag/kit/${accountId}`}>
            View kitbag
          </Link>
        </div>
      </div>
    );
  }

  return <React.Fragment>{renderBlock()}</React.Fragment>;
};

export default KitbagKitAnnouncement;
