import React from 'react';

import Title from '../includes/title/Title';
import Alert from '../includes/Alert';
import ResetForm from './ResetForm';

const ResetPage = () => {
  return (
    <div>
      <Title title="Reset your password" />
      <section
        id="main"
        className="container-fluid"
        aria-label="main body of content plus related links and features"
      >
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 mb-3 mx-auto">
              <Alert />
              <ResetForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPage;
