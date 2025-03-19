import React from 'react';
import { useParams } from 'react-router-dom';

import NewPasswordForm from './NewPasswordForm';

const NewPasswordPage = () => {
  const { token } = useParams();

  return (
    <div className="main container is-fluid">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-two-thirds-tablet is-half-desktop">
            <NewPasswordForm token={token} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPasswordPage;
