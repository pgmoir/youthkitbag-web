import React from 'react';

const TextAutoListInput = ({
  type,
  value,
  field,
  step,
  min,
  max,
  disabled,
  handleChange,
  error,
  autoComplete,
  addClassName,
  placeHolder,
  autoList,
}) => {
  return (
    <>
      <input
        className={`form-control${error ? ' is-invalid' : ''} ${
          addClassName ? addClassName : ''
        }`}
        name={field}
        type={type ? type : 'text'}
        step={step}
        min={min}
        max={max}
        disabled={disabled}
        onChange={handleChange}
        onBlur={handleChange}
        value={value}
        aria-describedby={field}
        autoComplete={autoComplete}
        tabIndex={disabled ? -1 : 0}
        placeholder={placeHolder}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </>
  );
};

export default TextAutoListInput;
