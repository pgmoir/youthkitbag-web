import React from 'react';

const Title = props => {
  function render() {
    if (props.title === '') {
      return <div className="container pb-3"></div>;
    }

    return (
      <section
        id="title"
        className="container-fluid px-0"
        role="banner"
        aria-label="breadcrumb navigation and page title"
      >
        <div className="container">
          <div className="d-block hgt-1"></div>
          <h1 className="h-standard pb-2">{props.title}</h1>
        </div>
      </section>
    );
  }

  return <React.Fragment>{render()}</React.Fragment>;
};

export default Title;
