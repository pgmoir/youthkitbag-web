import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { authenticateToken } from '../../actions/AuthActions';
import Title from '../includes/title/Title';

const mapDispatchToProps = {
  authenticateToken
};

const Token = ({ authenticateToken }) => {
  const { token } = useParams();

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
