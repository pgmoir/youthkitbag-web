import React from 'react';
import classNames from 'classnames';

const TextAreaInputStd = ({
  label,
  value,
  field,
  disabled,
  readOnly,
  handleChange,
  error,
  addClassName,
  rows,
  placeholder,
}) => {
  const textareaClassNames = classNames({
    textarea: true,
    'is-danger': error,
    addClassName: addClassName,
  });

  return (
    <div className="field">
      {label && (
        <label htmlFor="{field}" className="label">
          {label}
        </label>
      )}
      <div className="control has-icons-right">
        <textarea
          className={textareaClassNames}
          name={field}
          rows={rows ? rows : 5}
          disabled={disabled}
          readOnly={readOnly}
          onChange={handleChange}
          onBlur={handleChange}
          value={value}
          aria-describedby={field}
          tabIndex={disabled ? -1 : 0}
          placeholder={placeholder}
        ></textarea>
        {error && (
          <span className="icon is-small is-right">
            <i className="fas fa-exclamation-triangle"></i>
          </span>
        )}
      </div>
      {error && <p className="help is-danger">{error}</p>}
    </div>
  );
};

export default TextAreaInputStd;
