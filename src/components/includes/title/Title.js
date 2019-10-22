import React from 'react';

const Title = props => {
  return (
    <section
      id="title"
      className="container-fluid"
      role="banner"
      aria-label="breadcrumb navigation and page title"
    >
      <div className="container">
        <div className="d-block hgt-1"></div>
        <h1 className="h-standard pb-2">{props.title}</h1>
      </div>
    </section>
  );
};

export default Title;
