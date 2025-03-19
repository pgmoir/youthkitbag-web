import React from 'react';

import Title from './includes/title/Title';

const Error500 = () => {
  return (
    <div>
      <Title title="Error 500" />
      <section
        id="main"
        className="container-fluid"
        aria-label="main body of content plus related links and features"
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p className="h3">
                We&apos;re very sorry for the inconvenience. We&apos;re working
                on resolving the issue.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Error500;
