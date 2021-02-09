import React from 'react';
import LoginForm from './LoginForm';

const Login = ({ location }) => {
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
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-two-thirds-tablet is-half-desktop">
          <LoginForm referrer={referrer} />
        </div>
      </div>
    </div>
  );
};

export default Login;
