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

  return (
    <section
      id="title"
      className="container-fluid px-0"
      role="banner"
      aria-label="breadcrumb navigation and page title"
    >
      <div className="container">
        <div className="d-block hgt-1"></div>
        <h1 className="h-standard pb-2">Authenticating user ...</h1>
      </div>
    </section>
  );
};

export default connect(null, mapDispatchToProps)(Token);
