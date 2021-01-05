import React from 'react';
import { Link } from 'react-router-dom';
import { TextAreaForm, TextForm } from '../../includes/forms';

const WantedResponse = ({ values, handleChange, errors, handleSubmit }) => {
  return (
    <>
      {values && (
        <>
          <h3>Are you able to supply this item</h3>
          <p>
            If you can help fulfill this wanted request, then please submit an
            asking price, or optionally, leave as 0 (zero) if you&apos;re
            willing to donate for free, and any other relevant details. The
            purchaser will get back to you as quickly as possible.
          </p>
          <form className="mb-3" onSubmit={handleSubmit}>
            <div>
              <TextForm
                colFormat="3-9"
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
              <TextAreaForm
                colFormat="0-12"
                label="Details"
                value={values.details}
                field="details"
                handleChange={handleChange}
                error={errors.details}
              />
            </div>
            <hr />
            <div>
              <button className="btn btn-primary" type="submit">
                Offer
              </button>
              <Link className="btn btn-link" to="/market/market">
                Cancel
              </Link>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default WantedResponse;
