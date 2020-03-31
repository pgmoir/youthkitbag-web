import React, { useEffect, useState } from 'react';

const ImagesDisplay = ({ images }) => {
  const [topImageUrl, setTopImageUrl] = useState(null);

  useEffect(() => {
    if (images && images.length > 0) {
      setTopImageUrl(images[0].imageUrl);
    }
  }, [images, setTopImageUrl]);

  function renderSecondaryImages() {
    if (!images || images.length <= 1) {
      return null;
    }

    const items = [];

    for (let i = 0; i < images.length; i++) {
      items.push(
        <div key={`image${i}`} className="carousel-thumbnail d-inline-flex">
          <>
            <img
              className="img-fluid mb-3 img-link mini-img mr-1"
              src={images[i].imageUrl}
              alt=""
              role="presentation"
              onClick={renderTopImage.bind(null, images[i].imageUrl)}
            />
          </>
        </div>
      );
    }

    return <div>{items}</div>;
  }

  function renderTopImage(src) {
    setTopImageUrl(src);
  }

  return (
    <>
      <div className="col-12 col-md-6 order-1 order-md-2" role="main">
        <div>
          <img
            id="preview"
            name="preview"
            className="img-fluid mb-3"
            src={topImageUrl}
            alt=""
            role="presentation"
          />
        </div>
        <div>{renderSecondaryImages()}</div>
      </div>
    </>
  );
};

export { ImagesDisplay };
