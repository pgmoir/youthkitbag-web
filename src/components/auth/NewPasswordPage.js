import React from 'react';

import Title from '../includes/title/Title';
import Alert from '../includes/Alert';
import NewPasswordForm from './NewPasswordForm';

const NewPasswordPage = () => {
  return (
    <div>
      <Title title="Set a new password" />
      <section
        id="main"
        className="container-fluid"
        aria-label="main body of content plus related links and features"
      >
        <div className="container">
          <p className="lead">
            You have requested a password reset. The token supplied is currently
            valid, and you should enter a new password here.
          </p>
          <div className="row">
            <div className="col-12 col-md-6 mb-3 mx-auto">
              <Alert />
              <NewPasswordForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewPasswordPage;
