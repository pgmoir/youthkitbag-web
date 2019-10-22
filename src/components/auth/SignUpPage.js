import React from 'react';
import { Link } from 'react-router-dom';

import Title from '../includes/title/Title';
import Alert from '../includes/Alert';
import SignUpForm from './SignUpForm';

const SignUpPage = () => {
  return (
    <div>
      <Title title="Sign Up" />
      <section
        id="main"
        className="container-fluid"
        aria-label="main body of content plus related links and features"
      >
        <div className="container">
          <p className="lead">
            If you already have an account,{' '}
            <Link to="/auth/login">then login to access your account</Link>.
          </p>
          <div className="row">
            <div className="col-12 col-md-6 mb-3 mx-auto">
              <Alert />
              <SignUpForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUpPage;
