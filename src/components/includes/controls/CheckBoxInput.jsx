import React from 'react';

const CheckBoxInput = ({ label, value, field, onChange, help }) => {
  // return (
  //   <div className="field">
  //     {label && (
  //       <label htmlFor={field} className="label">
  //         {label}
  //       </label>
  //     )}
  //     <div className="columns is-vcentered mt-1">
  //       <div className="column">
  //         <input
  //           className="form-check-input is-checkbox-large"
  //           type="checkbox"
  //           name={field}
  //           onChange={onChange}
  //           checked={value}
  //           aria-describedby={field}
  //         />
  //       </div>
  //       <div className="column is-10">
  //         {help && (
  //           <p>
  //             <small id={`${field}help`} className="">
  //               {help}
  //             </small>
  //           </p>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="is-flex is-flex-checkbox is-align-items-center">
      <div className="checkbox is-flex-grow-0 is-flex-shrink-0">
        <input
          className="form-check-input is-checkbox-large"
          type="checkbox"
          name={field}
          onChange={onChange}
          checked={value}
          aria-describedby={field}
        />
      </div>
      <div className="is-flex-grow-1">
        <label htmlFor={field}>
          <strong>{label}</strong>
        </label>
        {help && (
          <p>
            <small id={`${field}help`} className="">
              {help}
            </small>
          </p>
        )}
      </div>
    </div>
  );
};

export default CheckBoxInput;
