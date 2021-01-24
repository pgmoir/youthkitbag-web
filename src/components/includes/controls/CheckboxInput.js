import React from 'react';

const CheckboxInput = ({ label, value, field, onChange, help }) => {
  return (
    <div className="columns">
      <div className="column is-2">
        <input
          className="form-check-input"
          type="checkbox"
          name={field}
          onChange={onChange}
          checked={value}
          aria-describedby={field}
        />
      </div>
      <div className="column is-10">
        <label htmlFor={field}>
          <strong>{label}</strong>
        </label>
        {help && (
          <p>
            <small id={`${field}help`} className="">
              {help}
            </small>
          </p>
        )}
      </div>
    </div>
  );
};

export default CheckboxInput;
