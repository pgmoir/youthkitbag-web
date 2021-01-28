import React from 'react';
import { Link } from 'react-router-dom';
import TextAreaInputStd from '../../includes/controls/TextAreaInputStd';
import TextInputStd from '../../includes/controls/TextInputStd';

export const TradeResponse = ({
  values,
  handleChange,
  errors,
  handleSubmit,
}) => {
  return (
    <>
      {values && (
        <>
          <h3>Are you interested in this item</h3>
          <p>
            If you are interested in aquiring this item, then please submit an
            offer price you&apos;re willing to pay, or leave as 0 (zero) hif te
            item is being offered for free and add any other relevant details
            below. The owner will get back to you as quickly as possible.
          </p>
          <form className="mb-3" onSubmit={handleSubmit}>
            <div>
              <TextInputStd
                type="number"
                label="Offer Price"
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
            </div>
            <hr />
            <div className="buttons">
              <button className="button is-primary" type="submit">
                Offer
              </button>
              <Link className="button is-warning" to="/market">
                Cancel
              </Link>
            </div>
          </form>
        </>
      )}
    </>
  );
};
