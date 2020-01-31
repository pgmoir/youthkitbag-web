import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { authenticateToken } from '../../actions/AuthActions';

const mapDispatchToProps = {
  authenticateToken
};

const Token = ({ authenticateToken, match }) => {
  const token = match.params.token;

  useEffect(() => {
    authenticateToken(token);
  }, [token, authenticateToken]);

  return <h1 className="loading-text">Authenticating user...</h1>;
};

export default connect(null, mapDispatchToProps)(Token);
