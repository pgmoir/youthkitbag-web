import React from 'react';

const KitbagMarketAnnouncement = () => {
  function renderBlock() {
    return (
      <div className="col-12 col-md-6">
        <h3>Kitbag market news</h3>
        <p>These items have been posted for trade.</p>
        <p>You have these new offers and messages.</p>
      </div>
    );
  }

  return <React.Fragment>{renderBlock()}</React.Fragment>;
};

export default KitbagMarketAnnouncement;
