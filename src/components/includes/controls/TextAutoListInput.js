import React from 'react';

const TextAutoListInput = ({
  type,
  value,
  field,
  step,
  min,
  max,
  readOnly,
  handleChange,
  error,
  autoComplete,
  addClassName,
  placeHolder,
  autoList
}) => {
  return (
    <React.Fragment>
      <input
        className={`form-control${error ? ' is-invalid' : ''} ${
          addClassName ? addClassName : ''
        }`}
        name={field}
        type={type ? type : 'text'}
        step={step}
        min={min}
        max={max}
        readOnly={readOnly}
        onChange={handleChange}
        onBlur={handleChange}
        value={value}
        aria-describedby={field}
        autoComplete={autoComplete}
        tabIndex={readOnly ? -1 : 0}
        placeholder={placeHolder}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </React.Fragment>
  );
};

export default TextAutoListInput;
