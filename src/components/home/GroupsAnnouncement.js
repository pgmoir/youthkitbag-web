import React from 'react';

const GroupsAnnouncement = () => {
  function renderBlock() {
    return (
      <div className="col-12 col-md-6">
        <h3>Groups news</h3>
        <p>These groups need to be approved.</p>
        <p>These members have requested to join these groups.</p>
      </div>
    );
  }

  return <React.Fragment>{renderBlock()}</React.Fragment>;
};

export default GroupsAnnouncement;
