import React from 'react';

const RemoveArrayButton = ({ title, onClick, index, disabled }) => {
  return (
    <div>
      <button
        className="button is-danger"
        id={`remove-btn-${title}-${index}`}
        type="button"
        title={title}
        onClick={onClick}
        disabled={disabled}
      >
        <span
          className="icon-tray-item fas fa-trash-alt"
          title="Delete this item"
        ></span>
      </button>
    </div>
  );
};

export default RemoveArrayButton;
