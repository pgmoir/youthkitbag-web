import React, { useState } from 'react';
import { getImage } from '../../../utils/image';
import { ImagesNav } from '../images';

const ImageModal = ({
  images,
  currentKey,
  modalIsActive,
  setModalIsActive,
}) => {
  const [imageKey, setImageKey] = useState(currentKey);

  const showImage = getImage({ images, index: imageKey });

  function closeModal() {
    setModalIsActive(false);
  }

  return (
    <div className={`modal ${modalIsActive ? 'is-active' : ''}`}>
      <div
        className="modal-background is-clickable"
        role="button"
        tabIndex="0"
        onClick={closeModal}
        onKeyPress={closeModal}
      ></div>
      <div
        className="modal-content is-clickable"
        role="button"
        tabIndex="0"
        onClick={closeModal}
        onKeyPress={closeModal}
      >
        <div className="image">
          <img src={showImage} alt="" />
        </div>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={closeModal}
      ></button>
      <ImagesNav
        images={images}
        imageKey={imageKey}
        setImageKey={setImageKey}
      />
    </div>
  );
};

export { ImageModal };
