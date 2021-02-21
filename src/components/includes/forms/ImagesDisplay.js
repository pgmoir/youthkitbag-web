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

    const thumbnails = images.map((image, index) => {
      return (
        <div key={index} className="is-flex is-flex-direction-row mb-3 ml-3">
          <div className="card">
            <div className="card-image is-clickable">
              <figure className="image is-square is-128x128">
                <img
                  src={image.imageUrl}
                  alt=""
                  role="presentation"
                  onClick={renderTopImage.bind(null, image.imageUrl)}
                />
              </figure>
            </div>
          </div>
        </div>
      );
    });

    return <div className="columns is-multiline mt-3 mb-0">{thumbnails}</div>;
  }

  function renderTopImage(src) {
    setTopImageUrl(src);
  }

  return (
    <>
      <figure className="image mb-3">
        <img
          id="preview"
          name="preview"
          src={topImageUrl}
          alt=""
          role="presentation"
        />
      </figure>
      {renderSecondaryImages()}
    </>
  );
};

export { ImagesDisplay };
