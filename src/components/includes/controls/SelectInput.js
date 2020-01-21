import React from 'react';

const SelectInput = ({ value, field, handleChange, items, useItem }) => {
  return (
    <React.Fragment>
      <select
        className="custom-select"
        name={field}
        onChange={handleChange}
        onBlur={handleChange}
        value={value}
        aria-describedby={field}
      >
        {items.map(item => {
          const regex = /\s/g;
          const id = item.replace(regex, '').toLowerCase();
          return (
            <option key={id} value={useItem ? item : id}>
              {item}
            </option>
          );
        })}
      </select>
    </React.Fragment>
  );
};

export default SelectInput;
