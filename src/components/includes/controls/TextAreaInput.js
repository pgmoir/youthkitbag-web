import React from 'react';

const TextAreaInput = ({
  value,
  field,
  readOnly,
  handleChange,
  error,
  addClassName,
  rows,
  placeholder
}) => {
  return (
    <React.Fragment>
      <textarea
        className={`form-control${error ? ' is-invalid' : ''} ${
          addClassName ? addClassName : ''
        }`}
        name={field}
        rows={rows ? rows : 5}
        readOnly={readOnly}
        onChange={handleChange}
        onBlur={handleChange}
        value={value}
        aria-describedby={field}
        tabIndex={readOnly ? -1 : 0}
        placeholder={placeholder}
      ></textarea>
      {error && <div className="invalid-feedback">{error}</div>}
    </React.Fragment>
  );
};

export default TextAreaInput;
