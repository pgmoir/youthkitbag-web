import React from 'react';
import { Link } from 'react-router-dom';

const SettingsNav = ({ page, fill }) => {
  return (
    <>
      <div
        className={`list-group-item ${fill} ${page === 'user' ? 'active' : ''}`}
      >
        <Link to="/settings/user">User</Link>
      </div>
      <div
        className={`list-group-item ${fill} ${
          page === 'kitbags' ? 'active' : ''
        }`}
      >
        <Link to="/settings/kitbags">Kitbags</Link>
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
          page === 'bundle' ? 'active' : ''
        }`}
      >
        <Link to="/settings/bundle">Bundle</Link>
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
