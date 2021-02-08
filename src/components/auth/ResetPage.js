import React from 'react';
import Title from '../includes/title/Title';
import ResetForm from './ResetForm';

const ResetPage = () => {
  return (
    <div className="container">
      <Title title="Reset your password" />
      <div className="columns is-centered">
        <div className="column is-two-thirds-tablet is-half-desktop">
          <ResetForm />
        </div>
      </div>
    </div>
  );
};

export default ResetPage;
