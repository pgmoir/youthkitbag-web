import React from 'react';

const ShowTitle = ({ group }) => {
  function getTitle() {
    if (!group || !group._id) {
      return <h1 className="h-standard pt-0 pb-2">Loading ...</h1>;
    }

    return (
      <>
        <div className="d-flex flex-row pb-3">
          <h1 className="d-none d-md-block align-self-center pr-3">
            <span className="h4">
              <em>Join YouthKitbag group:</em>
            </span>
            <br />
            {group.name}
          </h1>{' '}
          <h1 className="h3 d-block d-md-none align-self-center pr-3">
            <span className="h4">
              <em>Join YouthKitbag group:</em>
            </span>
            <br />
            {group.name}
          </h1>
          <img
            src={group.images[0].imageUrl}
            alt=""
            role="presentation"
            className="img-small ml-auto align-self-center"
          />
        </div>
      </>
    );
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
        {getTitle()}
      </div>
    </section>
  );
};

export default ShowTitle;
