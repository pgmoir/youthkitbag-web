import React from 'react';
import { Link } from 'react-router-dom';
import Title from '../includes/title/Title';
import Alert from '../includes/Alert';
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
    <div>
      <Title title="Login" />
      <section
        id="main"
        className="container-fluid"
        aria-label="main body of content plus related links and features"
      >
        <div className="container">
          <p className="lead">
            If you don&apos;t have an kitbag already,{' '}
            <Link to="/auth/signup">then sign up for an kitbag</Link>. Or for
            the forgetful,{' '}
            <Link to="/auth/reset">then reset your password</Link>.
          </p>
          <div className="row">
            <div className="col-12 col-md-6 mb-3 mx-auto">
              <Alert />
              <LoginForm referrer={referrer} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
