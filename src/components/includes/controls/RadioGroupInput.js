import React from 'react';

const RadioGroupInput = ({ options, value, field, handleChange }) => {
  return (
    <React.Fragment>
      <div className="col-auto mt-2">
        {options.map(option => {
          return (
            <div className="form-check form-check-inline" key={option}>
              <input
                className="form-check-input form-check-adjust"
                type="radio"
                name={field}
                id={option}
                value={option}
                onChange={handleChange}
                checked={value === option}
              />
              <label className="form-check-label" htmlFor={option}>
                {option}
              </label>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default RadioGroupInput;
