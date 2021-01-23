import React from 'react';

const SelectInput = ({ value, field, handleChange, items, useItem, error }) => {
  return (
    <>
      <div className="control">
        <div className="select">
          <select
            name={field}
            onChange={handleChange}
            onBlur={handleChange}
            value={value}
            aria-describedby={field}
          >
            {items.map((item) => {
              const regex = /\s/g;
              const id = item.replace(regex, '').toLowerCase();
              return (
                <option key={id} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      {error && <p className="help is-danger">{error}</p>}
    </>
  );
};

export default SelectInput;
