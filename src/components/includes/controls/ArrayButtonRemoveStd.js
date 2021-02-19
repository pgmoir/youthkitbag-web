import React from 'react';

const RemoveArrayButtonStd = ({ label, title, onClick, index, disabled }) => {
  return (
    <div>
      {index === 0 && label && (
        <label className="label" htmlFor={`remove-btn-${title}-${index}`}>
          {label}
        </label>
      )}
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

export default RemoveArrayButtonStd;
