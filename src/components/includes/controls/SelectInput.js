import React from 'react';
import classNames from 'classnames';

const SelectInput = ({
  label,
  value,
  field,
  handleChange,
  items,
  error,
  iconLeft,
}) => {
  const controlClasses = classNames({
    control: true,
    'has-icons-left': iconLeft,
  });

  return (
    <div className="field">
      {label && (
        <label htmlFor={field} className="label">
          {label}
        </label>
      )}
      <div className={controlClasses}>
        <div className="select">
          <select
            name={field}
            onChange={handleChange}
            onBlur={handleChange}
            value={value}
            aria-describedby={field}
          >
            {items.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        {iconLeft && (
          <div className="icon is-small is-left">
            <i className={iconLeft}></i>
          </div>
        )}
      </div>
      {error && <p className="help is-danger">{error}</p>}
    </div>
  );
};

export default SelectInput;
