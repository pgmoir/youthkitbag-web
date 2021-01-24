import React from 'react';
import classNames from 'classnames';

const RemoveArrayButton = ({ title, onClick, index, disabled, width }) => {
  const columnClasses = classNames('column', `is-${width}`);

  return (
    <div className={columnClasses}>
      {index === 0 && (
        <label className="label" htmlFor={`remove-btn-${title}-${index}`}>
          Rem
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

export default RemoveArrayButton;
