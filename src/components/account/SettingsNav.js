import React from 'react';
import { Link } from 'react-router-dom';

const SettingsNav = ({ page, fill }) => {
  return (
    <>
      <div
        className={`list-group-item ${fill} ${
          page === 'profile' ? 'active' : ''
        }`}
      >
        <Link to="/settings/profile">Profile</Link>
      </div>
      <div
        className={`list-group-item ${fill} ${
          page === 'accounts' ? 'active' : ''
        }`}
      >
        <Link to="/settings/accounts">Accounts</Link>
      </div>
      <div
        className={`list-group-item ${fill} ${
          page === 'groups' ? 'active' : ''
        }`}
      >
        <Link to="/settings/groups">Groups</Link>
      </div>
      <div
        className={`list-group-item ${fill} ${
          page === 'package' ? 'active' : ''
        }`}
      >
        <Link to="/settings/package">Package</Link>
      </div>
      <div
        className={`list-group-item ${fill} ${
          page === 'configuration' ? 'active' : ''
        }`}
      >
        <Link to="/settings/configuration">Configuration</Link>
      </div>
    </>
  );
};

export default SettingsNav;
