import React, { useEffect } from 'react';
import Title from './includes/title/Title';
import { connect } from 'react-redux';
import { fetchBundles } from '../actions/BundlesActions';
import Bundle from './Bundle';

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  bundles: state.bundles.items,
});

const mapDispatchToProps = {
  fetchBundles,
};

const Bundles = ({ auth, user, bundles, fetchBundles }) => {
  useEffect(() => {
    fetchBundles({ user });
  }, [user, fetchBundles]);

  const { loggedIn } = auth;

  if (!bundles || bundles.length === 0) return null;

  return (
    <div className="container">
      <Title title="Bundles & Benefits" />
      <div className="columns">
        {bundles.map((p, index) => (
          <Bundle key={index} loggedIn={loggedIn} user={user} bundle={p} />
        ))}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Bundles);
