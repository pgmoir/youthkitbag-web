import React from 'react';

const CheckBoxInput = ({ label, value, field, onChange, help }) => {
  return (
    <div className="columns is-vcentered">
      <div className="column is-">
        <input
          className="form-check-input is-checkbox-large"
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

export default CheckBoxInput;
