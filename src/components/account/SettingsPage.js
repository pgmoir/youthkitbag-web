import React from 'react';
import AccountPage from './AccountPage';

const SettingsPage = ({ match }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-3">
          <h2>Menu options</h2>
        </div>
        <div className="col-12 col-md-9">
          <AccountPage match={match} />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
