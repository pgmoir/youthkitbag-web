import React from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import LoginForm from './LoginForm';

const Login = () => {
  const location = useLocation();
  const { email } = queryString.parse(location.search);

  let referrer = '/';
  if (
    location &&
    location.state &&
    location.state.from &&
    location.state.from.pathname
  ) {
    referrer = location.state.from.pathname;
  }
  return (
    <div className="main container is-fluid">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-two-thirds-tablet is-half-desktop">
            <LoginForm referrer={referrer} email={email} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
