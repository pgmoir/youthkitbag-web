import React from 'react';
import { Helmet } from 'react-helmet';

const Title = ({ title, icon, hasHr = true }) => {
  if (title === '') {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{`${title} - YouthKitbag`}</title>
      </Helmet>
      <h1 className="title is-size-4">
        {title}
        {icon && <i className={`${icon} ml-3`}></i>}
      </h1>
      {hasHr && <hr />}
    </>
  );
};

export default Title;
