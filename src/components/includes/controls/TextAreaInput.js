import React from 'react';

const TextAreaInput = ({ value, field, readOnly, handleChange, error }) => {
  return (
    <React.Fragment>
      <textarea
        className={`form-control${error ? ' is-invalid' : ''}`}
        name={field}
        rows="5"
        readOnly={readOnly}
        onChange={handleChange}
        onBlur={handleChange}
        value={value}
        aria-describedby={field}
        tabIndex={readOnly ? -1 : 0}
      ></textarea>
      {error && <div className="invalid-feedback">{error}</div>}
    </React.Fragment>
  );
};

export default TextAreaInput;
