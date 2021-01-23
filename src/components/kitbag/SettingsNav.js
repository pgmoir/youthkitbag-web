import React from 'react';
import { NavLink } from 'react-router-dom';

// bulma converted
const SettingsNav = ({ fill }) => {
  return (
    <aside className="menu">
      <p className="menu-label">General</p>
      <ul class="menu-list">
        <li>
          <NavLink activeClassName="is-active" to="/settings/user">
            User
          </NavLink>
          <ul className="menu-list">
            <li>
              <NavLink activeClassName="is-active" to="/settings/kitbags">
                Kitbags
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="is-active" to="/settings/groups">
                Groups
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <NavLink activeClassName="is-active" to="/settings/bundle">
            Bundle
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="is-active" to="/settings/configuration">
            Configuration
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default SettingsNav;
