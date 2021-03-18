import React, { useState } from 'react';
import classNames from 'classnames';

const TextListInput = ({
  label,
  value,
  field,
  disabled,
  readOnly,
  setChange,
  error,
  autoComplete,
  addClassName,
  iconRight = true,
  iconLeft,
  suggestions,
  tagClass = 'is-success',
}) => {
  const [currentValue, setCurrentValue] = useState('');
  const [autoOptions, setAutoOptions] = useState([]);

  const controlClasses = classNames('control autocomplete', {
    'has-icons-right': iconRight,
    'has-icons-left': iconLeft,
  });

  const inputClasses = classNames('input', addClassName, {
    'is-danger': error,
  });

  const tagClasses = classNames(`tag ${tagClass}`);

  if (!value) return null;

  let items = Array.isArray(value) ? value : value.split(',');

  const onChange = (event) => {
    event.persist();
    const { value } = event.target;
    setCurrentValue(value);
    if (suggestions?.length > 0) {
      const foundSuggestions = suggestions.filter((suggestion) =>
        suggestion.includes(value)
      );
      setAutoOptions(foundSuggestions);
    }
  };

  const onKeyPress = (event) => {
    if (event.defaultPrevented) return;

    function handleKeyPress(key, value) {
      if (key === 'Enter') {
        const elements = value.split(',');
        elements.forEach((element) => {
          const newItem = element.trim().toLowerCase().replace(' ', '-');
          if (newItem.length && !items.includes(newItem)) {
            items = [...items, newItem];
          }
        });
        setChange(field, items);
        setCurrentValue('');
        return true;
      }
      return false;
    }

    let handled = false;

    if (event.key !== undefined) {
      handled = handleKeyPress(event.key, event.target.value);
    } else if (event.keyCode !== undefined) {
      handled = handleKeyPress(event.keyCode, event.target.value);
    }

    if (handled) {
      event.preventDefault();
    }
  };

  const removeItem = (event) => {
    const removeItem = event.target.getAttribute('data-item');
    items = items.filter((item) => item !== removeItem);
    setChange(field, items);
  };

  return (
    <div className="field">
      {label && (
        <label htmlFor={field} className="label">
          {label}
        </label>
      )}
      <>
        {readOnly ? (
          <div className="tags are-medium">
            {items.map((item, index) => {
              return (
                <span key={index} className="tag is-success">
                  {item}
                </span>
              );
            })}
          </div>
        ) : (
          <>
            <div className="field is-grouped is-grouped-multiline">
              {items.map((item, index) => {
                return (
                  <div key={index} className="control">
                    <div className="tags are-medium has-addons">
                      <div className={tagClasses}>{item}</div>
                      <div
                        className="tag is-delete is-clickable"
                        onClick={removeItem}
                        onKeyPress={removeItem}
                        role="button"
                        tabIndex="0"
                        data-item={item}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={controlClasses}>
              <input
                className={inputClasses}
                name={field}
                type="text"
                disabled={disabled}
                readOnly={readOnly}
                onChange={(event) => onChange(event)}
                onBlur={(event) => onChange(event)}
                onKeyPress={(event) => onKeyPress(event)}
                value={currentValue}
                aria-describedby={field}
                autoComplete={autoComplete}
                tabIndex={disabled || readOnly ? -1 : 0}
                placeholder={`Enter new item and press enter`}
              />
              {iconLeft && (
                <span className="icon is-small is-left">
                  <i className={iconLeft}></i>
                </span>
              )}
              {error && iconRight && (
                <span className="icon is-small is-right">
                  <i className="fas fa-exclamation-triangle"></i>
                </span>
              )}
              {currentValue.length > 0 && autoOptions.length > 0 && (
                <div className="autocomplete-items">
                  {autoOptions.map((autoOption) => {
                    return (
                      <div key={autoOption} data-item={autoOption}>
                        {autoOption}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {error && <p className="help is-danger">{error}</p>}
          </>
        )}
      </>
    </div>
  );
};

export default TextListInput;
