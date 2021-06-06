import React, { useState } from 'react';
import classNames from 'classnames';

const TextListSelect = ({
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
}) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [autoOptions, setAutoOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(-1);
  const AUTOSUGGEST_LIMIT = 10;

  const controlClasses = classNames('control autocomplete', {
    'has-icons-right': iconRight,
    'has-icons-left': iconLeft,
  });

  const inputClasses = classNames('input', addClassName, {
    'is-danger': error,
  });

  const setItem = (value) => {
    setChange(field, value);
    setCurrentValue(value);
  };

  function* suggestionsFilter(array, condition, maxSize) {
    if (!maxSize || maxSize > array.length) {
      maxSize = array.length;
    }
    let count = 0;
    let i = 0;
    while (count < maxSize && i < array.length) {
      if (condition(array[i].toLowerCase())) {
        yield array[i];
        count++;
      }
      i++;
    }
  }

  const onBlur = (event) => {
    event.persist();
    const { value } = event.target;
    setItem(value);
  };

  const onChange = (event) => {
    event.persist();
    const { value } = event.target;
    setCurrentValue(value);
    setSelectedOption(-1);
    if (suggestions?.length > 0) {
      const foundSuggestions = Array.from(
        suggestionsFilter(
          suggestions,
          (suggestion) => suggestion.includes(value.toLowerCase()),
          AUTOSUGGEST_LIMIT
        )
      );
      setAutoOptions(foundSuggestions);
    }
  };

  const onKeyPress = (event) => {
    if (event.defaultPrevented) return;

    function handleKeyPress(key, value) {
      if (key === 'Enter' && event.target.value.length > 0) {
        setItem(value);
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

  const onKeyDown = (event) => {
    if (event.defaultPrevented) return;

    function handleKeyDown(key) {
      if (key === 'ArrowDown') {
        if (selectedOption < autoOptions.length - 1) {
          setSelectedOption(selectedOption + 1);
          setCurrentValue(autoOptions[selectedOption + 1]);
        }
        return true;
      }
      if (key === 'ArrowUp') {
        if (selectedOption > 0) {
          setSelectedOption(selectedOption - 1);
          setCurrentValue(autoOptions[selectedOption - 1]);
        }
        return true;
      }
      return false;
    }

    let handled = false;
    if (event.key !== undefined) {
      handled = handleKeyDown(event.key);
    } else if (event.keyCode !== undefined) {
      handled = handleKeyDown(event.keyCode);
    }

    if (handled) {
      event.preventDefault();
    }
  };

  const selectOption = (event) => {
    const optionValue = event.target.getAttribute('data-item');
    setItem(optionValue);

    event.preventDefault();
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
            <span className="tag is-success">{value}</span>
          </div>
        ) : (
          <>
            <div className={controlClasses}>
              <input
                className={inputClasses}
                name={field}
                type="text"
                disabled={disabled}
                readOnly={readOnly}
                onChange={onChange}
                onBlur={onBlur}
                onKeyPress={onKeyPress}
                onKeyDown={onKeyDown}
                value={currentValue}
                aria-describedby={field}
                autoComplete={autoComplete}
                tabIndex={disabled || readOnly ? -1 : 0}
                placeholder={`Enter item and press enter`}
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
              {currentValue.length > 0 &&
                autoOptions.length > 0 &&
                value !== currentValue && (
                  <div className="autocomplete-items">
                    {autoOptions.map((autoOption, index) => {
                      return (
                        <div
                          key={index}
                          data-item={autoOption}
                          onClick={selectOption}
                          onKeyDown={selectOption}
                          onTouchEnd={selectOption}
                          role="button"
                          tabIndex="0"
                          className={
                            index === selectedOption
                              ? 'autocomplete-active'
                              : ''
                          }
                        >
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

export default TextListSelect;
