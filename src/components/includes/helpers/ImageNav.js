import React from 'react';

const ImageNav = ({ images, imageKey, setImageKey }) => {
  if (!images || images.length <= 1) return null;

  const lastImageKey = images.length - 1;

  const moveImage = (e, adjust) => {
    e.stopPropagation();
    if (lastImageKey > 0) {
      let newKey = imageKey + adjust;
      if (newKey < 0) {
        newKey = lastImageKey;
      } else if (newKey > lastImageKey) {
        newKey = 0;
      }
      setImageKey(newKey);
    }
  };

  return (
    <>
      <div className="has-text-left p-2 is-overlay-leftcenter icon-top-adjust">
        <span
          className="tag is-medium is-clickable is-seethru"
          onClick={(e) => {
            moveImage(e, -1);
          }}
          onKeyPress={(e) => {
            moveImage(e, -1);
          }}
          role="button"
          tabIndex="0"
        >
          <span
            className="fas fa-chevron-circle-left"
            title="Show previous image in loop"
          ></span>
        </span>
      </div>
      <div className="has-text-left p-2 is-overlay-rightcenter icon-top-adjust">
        <span
          className="tag is-medium is-clickable is-seethru"
          onClick={(e) => {
            moveImage(e, 1);
          }}
          onKeyPress={(e) => {
            moveImage(e, 1);
          }}
          role="button"
          tabIndex="0"
        >
          <span
            className="fas fa-chevron-circle-right"
            title="Show next image in loop"
          ></span>
        </span>
      </div>
    </>
  );
};

export default ImageNav;
