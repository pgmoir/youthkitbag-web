import React from 'react';
import classNames from 'classnames';

const TextInputCol = ({
  type,
  label,
  value,
  field,
  step,
  min,
  max,
  disabled,
  readOnly,
  handleChange,
  error,
  autoComplete,
  addClassName,
  placeHolder,
  width,
  index,
}) => {
  const columnClasses = classNames('column', `is-${width}`);

  const controlClasses = classNames('control');

  const inputClasses = classNames({
    input: true,
    'is-danger': error,
    addClassName: addClassName,
  });

  return (
    <div className={columnClasses}>
      {index === 0 && label && (
        <label htmlFor="{field}" className="label">
          {label}
        </label>
      )}
      <div className={controlClasses}>
        <input
          className={inputClasses}
          name={field}
          type={type ? type : 'text'}
          step={step}
          min={min}
          max={max}
          disabled={disabled}
          readOnly={readOnly}
          onChange={handleChange}
          onBlur={handleChange}
          value={value}
          aria-describedby={field}
          autoComplete={autoComplete}
          tabIndex={disabled || readOnly ? -1 : 0}
          placeholder={placeHolder}
        />
      </div>
      {error && <p className="help is-danger">{error}</p>}
    </div>
  );
};

export default TextInputCol;
