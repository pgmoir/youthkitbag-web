import React from 'react';
import { Helmet } from 'react-helmet';

const Title = ({ title, icon, iconTitle }) => {
  function render() {
    if (title === '') {
      return <div className="container pb-3"></div>;
    }

    return (
      <>
        <Helmet>
          <title>{`${title} - YouthKitbag`}</title>
        </Helmet>
        <section
          id="title"
          className="container-fluid px-0"
          role="banner"
          aria-label="breadcrumb navigation and page title"
        >
          <div className="container">
            <h1 className="h-standard pb-2">
              {title}
              {icon && (
                <span
                  className={`${icon} pl-3 text-center`}
                  title={iconTitle}
                ></span>
              )}
            </h1>
          </div>
        </section>
      </>
    );
  }

  return <>{render()}</>;
};

export default Title;
