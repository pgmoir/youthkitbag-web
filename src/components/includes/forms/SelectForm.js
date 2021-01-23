import React from 'react';
import SelectInput from '../controls/SelectInput';

const SelectForm = ({
  colFormat,
  label,
  value,
  field,
  handleChange,
  index,
  error,
  items,
  useItem,
}) => {
  const columns = colFormat.split('-');
  return (
    <div className="field">
      <label htmlFor={field} className="label">
        {label}
      </label>
      <SelectInput
        value={value}
        field={field}
        handleChange={handleChange}
        items={items}
        error={error}
        useItem={useItem}
      />
    </div>
  );

  // return (
  //   <>
  //     {colFormat === '3-9' && (
  //       <div className="form-group row">
  //         <label htmlFor={field} className="col-sm-3 col-form-label">
  //           {label}
  //         </label>
  //         <div className="col-sm-9">
  //           <SelectInput
  //             value={value}
  //             field={field}
  //             handleChange={handleChange}
  //             items={items}
  //             error={error}
  //             useItem={useItem}
  //           />
  //         </div>
  //       </div>
  //     )}
  //     {colFormat.startsWith('a') && (
  //       <div className={`form-group col-sm-${columns[1]}`}>
  //         {index === 0 && <label className="d-none d-sm-block">{label}</label>}
  //         <SelectInput
  //           value={value}
  //           field={field}
  //           handleChange={handleChange}
  //           items={items}
  //           error={error}
  //           useItem={useItem}
  //         />
  //       </div>
  //     )}
  //   </>
  // );
};

export { SelectForm };
