import React from 'react';
import classNames from 'classnames';

const TextInput = ({
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
  iconRight = true,
  iconLeft,
  isLink,
}) => {
  const controlClasses = classNames('control', {
    'has-icons-right': iconRight,
    'has-icons-left': iconLeft,
  });

  const inputClasses = classNames('input', addClassName, {
    'is-danger': error,
  });

  function displayReadOnly() {
    if (isLink) {
      return (
        <p>
          <span className="mr-3">
            <a href={value}>{value}</a>
          </span>
          <i className="fas fa-external-link-alt has-text-primary"></i>
        </p>
      );
    }

    return <p>{value}</p>;
  }

  return (
    <div className="field">
      {label && (
        <label htmlFor={field} className="label">
          {label}
        </label>
      )}
      {readOnly ? (
        displayReadOnly()
      ) : (
        <>
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
            {iconLeft && (
              <span className="icon is-small is-left">
                <i className={iconLeft}></i>
              </span>
            )}
            {error && iconRight && (
              <span className="icon is-small is-right">
                <i className="fas fa-exclamation-triangle"></i>
              </span>
            )}
          </div>
          {error && <p className="help is-danger">{error}</p>}
        </>
      )}
    </div>
  );
};

export default TextInput;
