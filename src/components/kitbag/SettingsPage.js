import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Title from '../includes/title/Title';
import ProfileForm from './ProfileForm';
import KitbagsPage from './KitbagsPage';
import GroupsPage from './GroupsPage';
import BundlePage from './BundlePage';
import Alert from '../includes/Alert';
import ProfileHelp from './ProfileHelp';
import KitbagsHelp from './KitbagsHelp';
import GroupsHelp from './GroupsHelp';
import ConfigurationPage from './ConfigurationPage';
import SettingsNav from './SettingsNav';

const mapStateToProps = (state) => ({
  profile: state.user.profile,
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

  const Kitbags = () => {
    setPage('kitbags');
    return (
      <div className="container">
        <h2>Kitbags</h2>
        <KitbagsHelp />
        <KitbagsPage />
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

  const Bundle = () => {
    setPage('bundle');
    return (
      <div className="container">
        <h2>Bundle</h2>
        <BundlePage />
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

  return (
    <div>
      <Title title="Personal Settings" />
      <div className="container">
        <Alert />
        <div className="row">
          <div className="col-12 col-md-2 mb-3">
            <div className="d-flex d-md-none list-group list-group-horizontal">
              <SettingsNav page={page} fill="flex-fill" />
            </div>
            <div className="d-none d-md-flex list-group">
              <SettingsNav page={page} />
            </div>
          </div>
          <div className="col-12 col-md-10">
            <Route path="/settings/profile" component={Profile} />
            <Route path="/settings/kitbags" component={Kitbags} />
            <Route path="/settings/groups" component={Groups} />
            <Route path="/settings/bundle" component={Bundle} />
            <Route path="/settings/configuration" component={Configuration} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, null)(SettingsPage);
