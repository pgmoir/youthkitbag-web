import React from 'react';
import { Link } from 'react-router-dom';
import TextAreaInputStd from '../../includes/controls/TextAreaInputStd';
import TextInputStd from '../../includes/controls/TextInputStd';

export const WantedResponse = ({
  values,
  handleChange,
  errors,
  handleSubmit,
}) => {
  return (
    <>
      {values && (
        <div className="content">
          <p className="is-size-6 has-text-weight-medium">
            Are you able to supply this item?
          </p>
          <p className="is-size-6">
            If you can help fulfill this wanted request, then please submit an
            asking price, or optionally, leave as 0 (zero) if you&apos;re
            willing to donate for free, and include any other relevant details.
            The purchaser will get back to you as quickly as possible.
          </p>
          <form onSubmit={handleSubmit}>
            <TextInputStd
              type="number"
              label="Asking Price"
              value={values.responsePrice}
              field="responsePrice"
              step=".01"
              min="0"
              max="29999.99"
              handleChange={handleChange}
              error={errors.responsePrice}
            />
            <TextAreaInputStd
              label="Details"
              value={values.details}
              field="details"
              handleChange={handleChange}
              error={errors.details}
            />
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
        </div>
      )}
    </>
  );
};
