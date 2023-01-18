import React from 'react';
import { connect } from 'react-redux';
import { Route, useParams } from 'react-router-dom';

import Alert from '../includes/Alert';
import Breadcrumb from '../includes/Breadcrumb';
import BundlePage from './BundlePage';
import ConfigurationPage from './ConfigurationPage';
import GroupsHelp from './GroupsHelp';
import GroupsPage from './GroupsPage';
import KitbagsHelp from './KitbagsHelp';
import KitbagsPage from './KitbagsPage';
import SettingsNav from './SettingsNav';
import Title from '../includes/title/Title';
import UserForm from './UserForm';
import UserHelp from './UserHelp';
import { capitalize } from '../../utils/strings';

const mapStateToProps = (state) => ({
  user: state.user
});

const SettingsPage = ({ user }) => {
  const { setting } = useParams;

  const User = () => {
    return (
      <>
        <h2 className="subtitle has-text-weight-bold">User</h2>
        <UserHelp />
        <UserForm user={user} />
      </>
    );
  };

  const Kitbags = () => {
    return (
      <>
        <h2 className="subtitle has-text-weight-bold">Kitbags</h2>
        <KitbagsHelp />
        <KitbagsPage />
      </>
    );
  };

  const Groups = () => {
    return (
      <div className="container">
        <h2 className="subtitle has-text-weight-bold">Groups</h2>
        <GroupsHelp />
        <GroupsPage />
      </div>
    );
  };

  const Bundle = () => {
    return (
      <div className="container">
        <h2 className="subtitle has-text-weight-bold">Bundle</h2>
        <BundlePage />
      </div>
    );
  };

  const Configuration = () => {
    return (
      <div className="container">
        <h2 className="subtitle has-text-weight-bold">Configuration</h2>
        <ConfigurationPage userId={user._id} />
      </div>
    );
  };

  function getCrumbs(pageSetting) {
    if (!pageSetting) {
      return [{ title: 'Home', to: '/' }, { title: 'Personal Settings' }];
    }
    return [
      { title: 'Home', to: '/' },
      { title: 'Personal Settings', to: '/settings' },
      { title: capitalize(setting) }
    ];
  }

  return (
    <div className="main container is-fluid">
      <Breadcrumb crumbs={getCrumbs(setting)} />
      <Title title="Personal Settings" />
      <div className="container">
        <Alert />
        <div className="columns">
          <div className="column is-one-fifth">
            <SettingsNav />
            <hr />
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
    </div>
  );
};

export default connect(mapStateToProps, null)(SettingsPage);
