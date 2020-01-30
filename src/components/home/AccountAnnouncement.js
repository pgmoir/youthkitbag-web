import React from 'react';

const AccountAnnouncement = () => {
  function renderBlock() {
    return (
      <div className="col-12 col-md-6">
        <h3>Account recommendation</h3>
        <p>You havent joined or created an account yet.</p>
      </div>
    );
  }

  return <React.Fragment>{renderBlock()}</React.Fragment>;
};

export default AccountAnnouncement;
