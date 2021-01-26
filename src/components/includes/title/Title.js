import React from 'react';
import { Helmet } from 'react-helmet';

const Title = ({ title, icon, iconTitle }) => {
  function render() {
    if (title === '') {
      return null;
    }

    return (
      <>
        <Helmet>
          <title>{`${title} - YouthKitbag`}</title>
        </Helmet>
        <h1 className="title">{title}</h1>
        <hr />
      </>
    );
  }

  return <>{render()}</>;
};

export default Title;
