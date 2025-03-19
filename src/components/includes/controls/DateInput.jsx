import React, { useState } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';

const DateInput = ({
  label,
  value,
  field,
  disabled,
  readOnly,
  setChange,
  error,
  addClassName,
  placeHolder,
  iconRight,
  iconLeft,
}) => {
  const [currentValue, setCurrentValue] = useState(
    value && dayjs(value).isValid() ? dayjs(value).format('DD-MMM-YYYY') : ''
  );

  const handleDateChange = (event) => {
    if (disabled) return;

    if (!dayjs(event.target.value).isValid()) {
      setCurrentValue('');
      setChange(field, undefined);
      return;
    }

    if (dayjs(event.target.value).isBefore('1970-01-01', 'year')) {
      setCurrentValue('');
      setChange(field, undefined);
      return;
    }

    setCurrentValue(dayjs(event.target.value).format('DD-MMM-YYYY'));
    setChange(field, dayjs(event.target.value).toISOString());
    return;
  };

  const handleTypeChange = (event) => {
    if (disabled) return;
    setCurrentValue(event.target.value);
  };

  const controlClasses = classNames('control', {
    'has-icons-right': iconRight,
    'has-icons-left': iconLeft,
  });

  const inputClasses = classNames('input', addClassName, {
    'is-danger': error,
  });

  return (
    <div className="field">
      {label && (
        <label htmlFor={field} className="label">
          {label}
        </label>
      )}
      {readOnly ? (
        <p>{value}</p>
      ) : (
        <>
          <div className={controlClasses}>
            <input
              className={inputClasses}
              name={field}
              type="text"
              disabled={disabled}
              readOnly={readOnly}
              onChange={handleTypeChange}
              onBlur={handleDateChange}
              value={currentValue}
              aria-describedby={field}
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

export default DateInput;
