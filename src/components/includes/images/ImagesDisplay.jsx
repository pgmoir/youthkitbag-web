import React, { useState } from 'react';

import { getImage } from '../../../utils/image';
import { ImagesNav } from './ImagesNav';
import { ImageModal } from '../modals/ImageModal';

const ImagesDisplay = ({ images }) => {
  const [imageKey, setImageKey] = useState(0);
  const [modalIsActive, setModalIsActive] = useState(false);

  function renderThumbnails() {
    if (!images || images.length <= 1) {
      return null;
    }

    const thumbnails = images.map((image, index) => {
      return (
        <div key={index} className="is-flex is-flex-direction-row mb-3 ml-3">
          <div className="card">
            <div className="card-image is-clickable">
              <figure className="image is-square is-96x96">
                <img
                  src={image.imageUrl}
                  alt=""
                  role="presentation"
                  onClick={() => setImageKey(index)}
                />
              </figure>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="columns is-mobile is-multiline mt-3 mb-0">
        {thumbnails}
      </div>
    );
  }

  const showImage = getImage({ images, index: imageKey });

  return (
    <>
      <div className="image mb-3 carousel">
        <img
          id="preview"
          name="preview"
          src={showImage}
          alt=""
          role="presentation"
          className="is-clickable"
          onClick={() => setModalIsActive(true)}
        />
        <ImagesNav
          images={images}
          imageKey={imageKey}
          setImageKey={setImageKey}
        />
      </div>
      {renderThumbnails()}
      <ImageModal
        images={images}
        currentKey={imageKey}
        modalIsActive={modalIsActive}
        setModalIsActive={setModalIsActive}
      />
    </>
  );
};

export { ImagesDisplay };
