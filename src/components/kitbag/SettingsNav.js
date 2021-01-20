import React from 'react';
import { NavLink } from 'react-router-dom';

const SettingsNav = ({ fill }) => {
  return (
    <>
      <NavLink
        className={`list-group-item ${fill || ''}`}
        activeClassName="active"
        to="/settings/user"
      >
        User
      </NavLink>
      <NavLink
        className={`list-group-item ${fill || ''}`}
        activeClassName="active"
        to="/settings/kitbags"
      >
        Kitbags
      </NavLink>
      <NavLink
        className={`list-group-item ${fill || ''}`}
        activeClassName="active"
        to="/settings/groups"
      >
        Groups
      </NavLink>
      <NavLink
        className={`list-group-item ${fill || ''}`}
        activeClassName="active"
        to="/settings/bundle"
      >
        Bundle
      </NavLink>
      <NavLink
        className={`list-group-item ${fill || ''}`}
        activeClassName="active"
        to="/settings/configuration"
      >
        Configuration
      </NavLink>
    </>
  );
};

export default SettingsNav;
