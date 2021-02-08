import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { authenticateToken } from '../../actions/AuthActions';
import Title from '../includes/title/Title';

const mapDispatchToProps = {
  authenticateToken,
};

const Token = ({ authenticateToken, match }) => {
  const { token } = match.params;

  useEffect(() => {
    authenticateToken(token);
  }, [token, authenticateToken]);

  return (
    <div className="container">
      <Title title="Authenticating user ..." />
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Token);
