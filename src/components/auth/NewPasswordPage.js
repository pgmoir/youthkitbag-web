import React from 'react';
import Title from '../includes/title/Title';
import NewPasswordForm from './NewPasswordForm';

const NewPasswordPage = ({ match }) => {
  console.log('MATCH', match);
  const { token } = match.params;

  return (
    <div className="container">
      <Title title="Set a new password" />
      <div className="columns is-centered">
        <div className="column is-two-thirds-tablet is-half-desktop">
          <NewPasswordForm token={token} />
        </div>
      </div>
    </div>
  );
};

export default NewPasswordPage;
