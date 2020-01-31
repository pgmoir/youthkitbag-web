import React from 'react';
import { Link } from 'react-router-dom';

const MarketAnnouncement = () => {
  function renderBlock() {
    return (
      <div className="card border-0">
        <div className="alert alert-info mb-0" role="alert">
          <h2 className="alert-heading">Market watches</h2>
          <hr />
          <p>You have received responses to your trade offers.</p>
          <Link className="btn btn-info" to="/market">
            Check the market
          </Link>
        </div>
      </div>
    );
  }

  return <React.Fragment>{renderBlock()}</React.Fragment>;
};

export default MarketAnnouncement;
