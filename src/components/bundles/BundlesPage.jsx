import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchBundles } from '../../actions/BundlesActions';
import Alert from '../includes/Alert';
import Bundle from './Bundle';
import Breadcrumb from '../includes/Breadcrumb';
import Title from '../includes/title/Title';

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  bundles: state.bundles.items,
});

const mapDispatchToProps = {
  fetchBundles,
};

const BundlesPage = ({ auth, user, bundles, fetchBundles }) => {
  const pageTitle = 'Bundles & Benefits';

  useEffect(() => {
    fetchBundles({ user });
  }, [user, fetchBundles]);

  const { loggedIn } = auth;

  if (bundles?.length === 0) return null;

  const crumbs = [{ title: 'Home', to: '/' }, { title: pageTitle }];

  return (
    <div className="main container is-fluid">
      <Breadcrumb crumbs={crumbs} />
      <Title title={pageTitle} />
      <div className="container">
        <Alert />
        <div className="columns">
          {bundles.map((bundle) => (
            <Bundle
              key={bundle._id}
              loggedIn={loggedIn}
              user={user}
              bundle={bundle}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BundlesPage);
