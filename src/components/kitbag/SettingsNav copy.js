import React from 'react';
import { NavLink } from 'react-router-dom';
import { trackEvent } from '../../utils/analytics';

const SettingsNav = ({ fill }) => {
  return (
    <>
      <NavLink
        className={`list-group-item ${fill || ''}`}
        activeClassName="active"
        to="/settings/profile"
        onClick={() => trackEvent('Click profile tab')}
      >
        Profile
      </NavLink>
      <NavLink
        className={`list-group-item ${fill || ''}`}
        activeClassName="active"
        to="/settings/workspaces"
      >
        Workspaces
      </NavLink>
      {/* <NavLink
        className={`list-group-item ${fill || ''}`}
        activeClassName="active"
        to="/settings/configuration"
        onClick={() => trackEvent('Click configure tab')}
      >
        Configuration
      </NavLink> */}
    </>
  );
};

export default SettingsNav;
