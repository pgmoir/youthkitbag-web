import React from 'react';
import AccountPage from './AccountPage';

const SettingsPage = () => {
  return (
    <div className="row">
      <div className="col-12 col-md-3">
        <h2>Menu options</h2>
      </div>
      <div className="col-12 col-md-9">
        <AccountPage />
      </div>
    </div>
  );
};

export default SettingsPage;
