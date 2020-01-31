import React from 'react';
import { Link } from 'react-router-dom';

const KitbagMarketAnnouncement = () => {
  function renderBlock() {
    return (
      <div className="card border-0">
        <div className="alert alert-warning mb-0" role="alert">
          <h2 className="alert-heading">Kitbag market activity</h2>
          <hr />
          <p>The following items have recently been traded in your kitbag.</p>
          <p>You have the following responses to action.</p>
          <Link className="btn btn-warning" to={`/kmarket`}>
            View kitbag
          </Link>
        </div>
      </div>
    );
  }

  return <React.Fragment>{renderBlock()}</React.Fragment>;
};

export default KitbagMarketAnnouncement;
