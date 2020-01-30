import React from 'react';

const KitbagKitAnnouncement = () => {
  function renderBlock() {
    return (
      <div className="col-12 col-md-6">
        <h3>Kitbag kit news</h3>
        <p>These items have been added or changed recently.</p>
        <p>These items are at warning level.</p>
      </div>
    );
  }

  return <React.Fragment>{renderBlock()}</React.Fragment>;
};

export default KitbagKitAnnouncement;
