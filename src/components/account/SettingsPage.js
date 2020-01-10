import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { getUser } from '../../actions/UserActions';
import Title from '../includes/title/Title';
import ProfileForm from './ProfileForm';
import AccountsPage from './AccountsPage';
import GroupsPage from './GroupsPage';
import PackagePage from './PackagePage';
import BadgesPage from './BadgesPage';

const SettingsPage = ({ profile }) => {
  const [page, setPage] = useState(null);

  const Profile = () => {
    setPage('profile');
    return (
      <div className="container">
        <h2>Profile</h2>
        <ProfileForm profile={profile} />
      </div>
    );
  };

  const Accounts = () => {
    setPage('accounts');
    return (
      <div className="container">
        <h2>Accounts</h2>
        <AccountsPage />
      </div>
    );
  };

  const Groups = () => {
    setPage('groups');
    return (
      <div className="container">
        <h2>Groups</h2>
        <GroupsPage />
      </div>
    );
  };

  const Package = () => {
    setPage('package');
    return (
      <div className="container">
        <h2>Package</h2>
        <PackagePage />
      </div>
    );
  };

  const Badges = () => {
    setPage('badges');
    return (
      <div className="container">
        <h2>Badges</h2>
        <BadgesPage />
      </div>
    );
  };

  return (
    <div>
      <Title title="Personal Settings" />
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-2 pb-3">
            <ul className="list-group">
              <li
                className={`list-group-item ${
                  page === 'profile' ? 'active' : ''
                }`}
              >
                <Link to="/settings/profile">Profile</Link>
              </li>
              <li
                className={`list-group-item ${
                  page === 'accounts' ? 'active' : ''
                }`}
              >
                <Link to="/settings/accounts">Accounts</Link>
              </li>
              <li
                className={`list-group-item ${
                  page === 'groups' ? 'active' : ''
                }`}
              >
                <Link to="/settings/groups">Groups</Link>
              </li>
              <li
                className={`list-group-item ${
                  page === 'package' ? 'active' : ''
                }`}
              >
                <Link to="/settings/package">Package</Link>
              </li>
              <li
                className={`list-group-item ${
                  page === 'badges' ? 'active' : ''
                }`}
              >
                <Link to="/settings/badges">Badges</Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-10">
            <Route path="/settings/profile" component={Profile} />
            <Route path="/settings/accounts" component={Accounts} />
            <Route path="/settings/groups" component={Groups} />
            <Route path="/settings/package" component={Package} />
            <Route path="/settings/badges" component={Badges} />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  profile: state.user.profile
});

const mapDispatchToProps = {
  getUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage);
