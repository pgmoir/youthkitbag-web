import React from 'react';
import TextInput from '../controls/TextInput';

const TextForm = ({
  colFormat,
  label,
  type,
  value,
  field,
  step,
  min,
  max,
  disabled,
  handleChange,
  index,
  error,
  autoComplete,
  autoList,
}) => {
  const columns = colFormat.split('-');
  return (
    <>
      {/* {colFormat === '3-9' && ( */}
      <div className="field">
        <label htmlFor="{field}" className="label">
          {label}
        </label>
        <TextInput
          type={type}
          value={value}
          field={field}
          step={step}
          min={min}
          max={max}
          disabled={disabled}
          handleChange={handleChange}
          error={error}
          autoComplete={autoComplete}
          autoList={autoList}
        />
      </div>
      {/* )}
      {colFormat.startsWith('a') && (
        <div className={`form-group col-sm-${columns[1]}`}>
          {index === 0 && <label className="d-none d-sm-block">{label}</label>}
          <TextInput
            type={type}
            value={value}
            field={field}
            step={step}
            min={min}
            max={max}
            disabled={disabled}
            handleChange={handleChange}
            error={error}
            autoComplete={autoComplete}
            autoList={autoList}
          />
        </div>
      )} */}
    </>
  );
};

export { TextForm };
