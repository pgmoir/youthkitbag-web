import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Title from '../includes/title/Title';
import UserForm from './UserForm';
import KitbagsPage from './KitbagsPage';
import GroupsPage from './GroupsPage';
import BundlePage from './BundlePage';
import Alert from '../includes/Alert';
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
      <>
        <h2 className="subtitle">User</h2>
        {/* <UserHelp /> */}
        <UserForm user={user} />
      </>
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
    <div class="container">
      <Title title="Personal Settings" />
      <Alert />
      <div className="columns">
        <div className="column is-one-fifth">
          <SettingsNav />
        </div>
        <div className="column">
          <Route path="/settings/user" component={User} />
          <Route path="/settings/kitbags" component={Kitbags} />
          <Route path="/settings/groups" component={Groups} />
          <Route path="/settings/bundle" component={Bundle} />
          <Route path="/settings/configuration" component={Configuration} />
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, null)(SettingsPage);
