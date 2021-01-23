import React from 'react';

const TextAreaInput = ({
  value,
  field,
  disabled,
  handleChange,
  error,
  addClassName,
  rows,
  placeholder,
}) => {
  return (
    <>
      <div className="control">
        <textarea
          className={`textarea${error ? ' is-danger' : ''} ${
            addClassName ? addClassName : ''
          }`}
          name={field}
          rows={rows ? rows : 5}
          disabled={disabled}
          onChange={handleChange}
          onBlur={handleChange}
          value={value}
          aria-describedby={field}
          tabIndex={disabled ? -1 : 0}
          placeholder={placeholder}
        ></textarea>
      </div>
      {error && <p className="help is-danger">{error}</p>}
    </>
  );
};

export default TextAreaInput;
