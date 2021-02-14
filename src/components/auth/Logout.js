import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/AuthActions';

const mapDispatchToProps = {
  logout,
};

const Logout = ({ logout }) => {
  useEffect(() => {
    logout();
  }, [logout]);

  return <h1 className="loading-text">Logging out...</h1>;
};

export default connect(null, mapDispatchToProps)(Logout);
