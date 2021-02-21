import React from 'react';

import NewPasswordForm from './NewPasswordForm';

const NewPasswordPage = ({ match }) => {
  const { token } = match.params;

  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-two-thirds-tablet is-half-desktop">
          <NewPasswordForm token={token} />
        </div>
      </div>
    </div>
  );
};

export default NewPasswordPage;
