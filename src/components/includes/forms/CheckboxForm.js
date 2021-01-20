import React from 'react';
import CheckboxInput from '../controls/CheckboxInput';

const CheckboxForm = ({ colFormat, label, value, field, onChange, help }) => {
  return (
    <>
      {colFormat === '3-1-8' && (
        <div className="form-group row">
          <label className="col-sm-3" htmlFor={field}>
            {label}
          </label>
          <div className="col-1 col-sm-1">
            <div className="form-check">
              <CheckboxInput
                field={field}
                onChange={onChange}
                value={value}
                aria-describedby={field}
              />
            </div>
          </div>
          <div className="col-11 col-sm-8">
            <div className="form-check">
              <small
                id={`${field}help`}
                className="form-text text-muted form-control-help"
              >
                {help}
              </small>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { CheckboxForm };
