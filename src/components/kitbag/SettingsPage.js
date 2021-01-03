import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Title from '../includes/title/Title';
import UserForm from './UserForm';
import KitbagsPage from './KitbagsPage';
import GroupsPage from './GroupsPage';
import BundlePage from './BundlePage';
import Alert from '../includes/Alert';
import UserHelp from './UserHelp';
import KitbagsHelp from './KitbagsHelp';
import GroupsHelp from './GroupsHelp';
import ConfigurationPage from './ConfigurationPage';
import SettingsNav from './SettingsNav';

const mapStateToProps = (state) => ({
  user: state.user,
});

const SettingsPage = ({ user }) => {
  const User = () => {
    return (
      <div className="container">
        <h2>User</h2>
        <UserHelp />
        <UserForm user={user} />
      </div>
    );
  };

  const Kitbags = () => {
    return (
      <div className="container">
        <h2>Kitbags</h2>
        <KitbagsHelp />
        <KitbagsPage />
      </div>
    );
  };

  const Groups = () => {
    return (
      <div className="container">
        <h2>Groups</h2>
        <GroupsHelp />
        <GroupsPage />
      </div>
    );
  };

  const Bundle = () => {
    return (
      <div className="container">
        <h2>Bundle</h2>
        <BundlePage />
      </div>
    );
  };

  const Configuration = () => {
    return (
      <div className="container">
        <h2>Configuration</h2>
        <ConfigurationPage userId={user._id} />
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
              <SettingsNav fill="flex-fill" />
            </div>
            <div className="d-none d-md-flex list-group">
              <SettingsNav />
            </div>
          </div>
          <div className="col-12 col-md-10">
            <Route path="/settings/user" component={User} />
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
