import React from 'react';
import classNames from 'classnames';

const TextInputStd = ({
  type,
  label,
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
  iconLeft,
}) => {
  const wrapperClassNames = classNames({
    control: true,
    'has-icons-left': iconLeft,
    'has-icons-right': true,
  });

  const inputClassNames = classNames({
    input: true,
    'is-danger': error,
    addClassName: addClassName,
  });

  return (
    <div className="field">
      {label && (
        <label htmlFor="{field}" className="label">
          {label}
        </label>
      )}
      <div className={wrapperClassNames}>
        <input
          className={inputClassNames}
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
        {iconLeft && (
          <span className="icon is-small is-left">
            <i className={iconLeft}></i>
          </span>
        )}
        {error && (
          <span className="icon is-small is-right">
            <i className="fas fa-exclamation-triangle"></i>
          </span>
        )}
      </div>
      {error && <p className="help is-danger">{error}</p>}
    </div>
  );
};

export default TextInputStd;
