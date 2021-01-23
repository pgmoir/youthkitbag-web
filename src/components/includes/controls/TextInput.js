import React from 'react';

const TextInput = ({
  type,
  value,
  field,
  step,
  min,
  max,
  disabled,
  handleChange,
  error,
  autoComplete,
  addClassName,
  placeHolder,
}) => {
  return (
    <>
      <div className="control has-icons-right">
        <input
          className={`input${error ? ' is-danger' : ''} ${
            addClassName ? addClassName : ''
          }`}
          name={field}
          type={type ? type : 'text'}
          step={step}
          min={min}
          max={max}
          disabled={disabled}
          onChange={handleChange}
          onBlur={handleChange}
          value={value}
          aria-describedby={field}
          autoComplete={autoComplete}
          tabIndex={disabled ? -1 : 0}
          placeholder={placeHolder}
        />
        {error && (
          <span class="icon is-small is-right">
            <i class="fas fa-exclamation-triangle"></i>
          </span>
        )}
      </div>
      {error && <p className="help is-danger">{error}</p>}
    </>
  );
};

export default TextInput;
