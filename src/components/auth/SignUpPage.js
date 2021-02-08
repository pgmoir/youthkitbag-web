import React from 'react';
import Title from '../includes/title/Title';
import SignUpForm from './SignUpForm';

const SignUpPage = () => {
  return (
    <div className="container">
      <Title title="Sign Up" />
      <div className="columns is-centered">
        <div className="column is-two-thirds-tablet is-half-desktop">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
