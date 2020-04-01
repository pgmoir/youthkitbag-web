import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import Title from '../includes/title/Title';
import ProfileForm from './ProfileForm';
import AccountsPage from './AccountsPage';
import GroupsPage from './GroupsPage';
import PackagePage from './PackagePage';
// import BadgesPage from './BadgesPage';
import Alert from '../includes/Alert';
import ProfileHelp from './ProfileHelp';
import AccountsHelp from './AccountsHelp';
import GroupsHelp from './GroupsHelp';
import ConfigurationPage from './ConfigurationPage';

const mapStateToProps = state => ({
  profile: state.user.profile
});

const SettingsPage = ({ profile }) => {
  const [page, setPage] = useState(null);

  const Profile = () => {
    setPage('profile');
    return (
      <div className="container">
        <h2>Profile</h2>
        <ProfileHelp />
        <ProfileForm profile={profile} />
      </div>
    );
  };

  const Accounts = () => {
    setPage('accounts');
    return (
      <div className="container">
        <h2>Accounts</h2>
        <AccountsHelp />
        <AccountsPage />
      </div>
    );
  };

  const Groups = () => {
    setPage('groups');
    return (
      <div className="container">
        <h2>Groups</h2>
        <GroupsHelp />
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

  const Configuration = () => {
    setPage('configuration');
    return (
      <div className="container">
        <h2>Configuration</h2>
        <ConfigurationPage userId={profile._id} />
      </div>
    );
  };

  // const Badges = () => {
  //   setPage('badges');
  //   return (
  //     <div className="container">
  //       <h2>Badges</h2>
  //       <BadgesPage />
  //     </div>
  //   );
  // };

  return (
    <div>
      <Title title="Personal Settings" />
      <div className="container">
        <Alert />
        <div className="row">
          <div className="d-block d-sm-none col-12 pb-3">
            <div className="d-flex w-100 px-1">
              <div className="p-2 flex-fill bg-light">
                <Link to="/settings/profile">Profile</Link>
              </div>
              <div className="p-2 flex-fill bg-light">
                <Link to="/settings/accounts">Accounts</Link>
              </div>
              <div className="p-2 flex-fill bg-light">
                <Link to="/settings/groups">Groups</Link>
              </div>
              <div className="p-2 flex-fill bg-light">
                <Link to="/settings/package">Package</Link>
              </div>
              {/* <div className="p-2 flex-fill bg-light">
                <Link to="/settings/badges">Badges</Link>
              </div> */}
              <div className="p-2 flex-fill bg-light">
                <Link to="/settings/configuration">Configuration</Link>
              </div>
            </div>
          </div>
          <div className="d-none d-sm-block col-sm-2 pb-3">
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
              {/* <li
                className={`list-group-item ${
                  page === 'badges' ? 'active' : ''
                }`}
              >
                <Link to="/settings/badges">Badges</Link>
              </li> */}
              <li
                className={`list-group-item ${
                  page === 'configuration' ? 'active' : ''
                }`}
              >
                <Link to="/settings/configuration">Configuration</Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-sm-10">
            <Route path="/settings/profile" component={Profile} />
            <Route path="/settings/accounts" component={Accounts} />
            <Route path="/settings/groups" component={Groups} />
            <Route path="/settings/package" component={Package} />
            {/* <Route path="/settings/badges" component={Badges} /> */}
            <Route path="/settings/configuration" component={Configuration} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, null)(SettingsPage);
