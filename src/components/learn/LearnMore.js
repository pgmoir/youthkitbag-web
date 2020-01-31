import React from 'react';
import Alert from '../includes/Alert';
import Title from '../includes/title/Title';

const LearnMore = () => {
  return (
    <div>
      <section
        id="main"
        className="container-fluid"
        aria-label="main body of content plus related links and features"
      >
        <Title title="Coming soon" />
        <div className="container">
          <Alert />
          <div className="row"></div>
        </div>
      </section>
    </div>
  );
};

export default LearnMore;
