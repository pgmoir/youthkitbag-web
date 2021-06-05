import React, { useState } from 'react';
import classNames from 'classnames';

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

  const modalClasses = classNames('lightbox is-clickable', {
    'is-active': modalIsActive,
  });

  function closeModal() {
    setModalIsActive(false);
  }

  return (
    <div
      className={modalClasses}
      role="button"
      tabIndex="0"
      onClick={closeModal}
      onKeyPress={closeModal}
    >
      <span
        className="lightbox-image"
        style={{ backgroundImage: `url("${showImage}")` }}
      ></span>
      <ImagesNav
        images={images}
        imageKey={imageKey}
        setImageKey={setImageKey}
      />
    </div>
  );
};

export { ImageModal };
