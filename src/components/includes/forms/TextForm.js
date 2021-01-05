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
  readOnly,
  handleChange,
  index,
  error,
  autoComplete,
  autoList,
}) => {
  const columns = colFormat.split('-');
  return (
    <>
      {colFormat === '3-9' && (
        <div className="form-group row">
          <label htmlFor="{field}" className="col-sm-3 col-form-label">
            {label}
          </label>
          <div className="col-sm-9">
            <TextInput
              type={type}
              value={value}
              field={field}
              step={step}
              min={min}
              max={max}
              readOnly={readOnly}
              handleChange={handleChange}
              error={error}
              autoComplete={autoComplete}
              autoList={autoList}
            />
          </div>
        </div>
      )}
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
            readOnly={readOnly}
            handleChange={handleChange}
            error={error}
            autoComplete={autoComplete}
            autoList={autoList}
          />
        </div>
      )}
    </>
  );
};

export { TextForm };
