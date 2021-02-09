import React from 'react';
import SignUpForm from './SignUpForm';

const SignUpPage = () => {
  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-two-thirds-tablet is-half-desktop">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
