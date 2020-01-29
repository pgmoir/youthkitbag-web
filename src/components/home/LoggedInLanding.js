import React from 'react';
import Alert from '../includes/Alert';
import Title from '../includes/title/Title';

const LoggedInLanding = () => {
  return (
    <div>
      <section
        id="main"
        className="container-fluid"
        aria-label="main body of content plus related links and features"
      >
        <Title title="Personal Settings" />
        <div className="container">
          <Alert />
        </div>
      </section>
    </div>
  );
};

export default LoggedInLanding;
