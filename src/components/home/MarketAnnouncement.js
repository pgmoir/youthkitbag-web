import React from 'react';

const MarketAnnouncement = () => {
  function renderBlock() {
    return (
      <div className="col-12 col-md-6">
        <h3>Market news</h3>
        <p>These new items have been created that you may be interested in.</p>
      </div>
    );
  }

  return <React.Fragment>{renderBlock()}</React.Fragment>;
};

export default MarketAnnouncement;
