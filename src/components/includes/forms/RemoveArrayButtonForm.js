import React from 'react';

const RemoveArrayButtonForm = ({
  colFormat,
  title,
  onClick,
  index,
  disabled
}) => {
  const columnFormat = colFormat.split('-');
  return (
    <React.Fragment>
      {columnFormat[0] === 'a' && (
        <div className={`form-group col-sm-${columnFormat[1]}`}>
          {index === 0 && (
            <label
              className="d-none d-sm-block text-right"
              htmlFor={`remove-btn-${title}-${index}`}
            >
              Rem
            </label>
          )}
          <button
            className="btn btn-danger float-right"
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
      )}
    </React.Fragment>
  );
};

export { RemoveArrayButtonForm };
