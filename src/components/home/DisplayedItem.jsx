import React from 'react';
import { getFirstImageExcludeDeleted } from '../../utils/image';

const DisplayedItem = ({ index, clickAction, images, title, subtext }) => {
  function topImage(images) {
    return getFirstImageExcludeDeleted({ images });
  }

  return (
    <div
      key={index}
      className="box is-flex is-clickable p-3"
      role="button"
      onClick={clickAction}
      tabIndex="0"
    >
      <div className="is-flex-shrink-0 is-flex-grow-0 pr-4">
        <div className="image">
          <img src={topImage(images)} className="is-avatar is-48x48" alt="" />
        </div>
      </div>
      <div className="is-flex-shrink-1 is-flex-grow-1 is-flex is-flex-direction-column has-text-black has-truncated">
        <div className="is-truncated-text has-text-weight-medium">{title}</div>
        <div className="is-truncated-text">{subtext}</div>
      </div>
    </div>
  );
};

export default DisplayedItem;
