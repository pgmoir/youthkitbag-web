import React from 'react';
import { Helmet } from 'react-helmet';

const Title = ({ title, hasHr = true }) => {
  if (title === '') {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{`${title} - YouthKitbag`}</title>
      </Helmet>
      <h1 className="title is-size-4">{title}</h1>
      {hasHr && <hr />}
    </>
  );
};

export default Title;
