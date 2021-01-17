import React from 'react';
import { Link } from 'react-router-dom';
import { TextAreaForm } from '../../includes/forms';

export const LostResponse = ({
  values,
  handleChange,
  errors,
  handleSubmit,
}) => {
  return (
    <>
      {values && (
        <>
          <h3>Have any information about this item</h3>
          <p>
            If you can help with any information that could help recover this
            item, then please leave details below. The owner will be extremely
            grateful, and will get back in touch with you as quickly as
            possible.
          </p>
          <form className="mb-3" onSubmit={handleSubmit}>
            <div>
              <TextAreaForm
                colFormat="3-9"
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
