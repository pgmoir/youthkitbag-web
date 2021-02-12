import React from 'react';
import classNames from 'classnames';

const RadioGroupInput = ({ options, value, field, handleChange, isRow }) => {
  const controlClasses = classNames('control is-flex', {
    'is-flex-direction-row': isRow,
    'is-flex-direction-column': !isRow,
  });
  return (
    <>
      <div className={controlClasses}>
        {options.map((option) => {
          return (
            <div className="is-flex is-flex-grow-0" key={option}>
              <div className="is-flex-shrink-0 is-flex-grow-0 mr-3">
                <input
                  className="is-radio-large"
                  type="radio"
                  name={field}
                  id={option}
                  value={option}
                  onChange={handleChange}
                  checked={value === option}
                />
              </div>
              <div className="is-flex-grow-1 mr-5">{option}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RadioGroupInput;
