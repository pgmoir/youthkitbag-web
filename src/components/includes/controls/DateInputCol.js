import React, { useState } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';

const DateInputCol = ({
  label,
  value,
  field,
  disabled,
  readOnly,
  setChange,
  error,
  addClassName,
  placeHolder,
  width,
  index,
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

  const columnClasses = classNames('column', `is-${width}`);

  const controlClasses = classNames('control');

  const inputClasses = classNames('input', addClassName, {
    'is-danger': error,
  });

  return (
    <div className={columnClasses}>
      {index === 0 && label && (
        <label htmlFor={field} className="label">
          {label}
        </label>
      )}
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
      </div>
      {error && <p className="help is-danger">{error}</p>}
    </div>
  );
};

export default DateInputCol;
