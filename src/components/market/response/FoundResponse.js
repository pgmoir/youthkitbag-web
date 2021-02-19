import React from 'react';
import { Link } from 'react-router-dom';
import TextAreaInput from '../../includes/controls/TextAreaInput';

export const FoundResponse = ({
  values,
  handleChange,
  errors,
  handleSubmit,
}) => {
  return (
    <>
      {values && (
        <>
          <h3>Does this item belong to you</h3>
          <p>
            If you have lost this item, then please leave details below. The
            person who found the item will get back to you as quickly as
            possible.
          </p>
          <form className="mb-3" onSubmit={handleSubmit}>
            <div>
              <TextAreaInput
                label="Details"
                value={values.details}
                field="details"
                handleChange={handleChange}
                error={errors.details}
              />
            </div>
            <hr />
            <div className="buttons">
              <button className="button is-primary" type="submit">
                Offer
              </button>
              <Link className="button is-warning" to="/market/market">
                Cancel
              </Link>
            </div>
          </form>
        </>
      )}
    </>
  );
};
