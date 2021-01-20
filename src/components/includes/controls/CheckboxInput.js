import React from 'react';

const CheckboxInput = ({ value, field, onChange }) => {
  return (
    <>
      <input
        className="form-check-input"
        type="checkbox"
        name={field}
        onChange={onChange}
        checked={value}
        aria-describedby={field}
      />
    </>
  );
};

export default CheckboxInput;
