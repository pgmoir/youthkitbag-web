import React from 'react';
import { Link } from 'react-router-dom';
import { TextAreaForm } from '../../includes/forms';

const StolenResponse = ({ values, handleChange, errors, handleSubmit }) => {
  return (
    <>
      {values && (
        <>
          <h3>Do you have any information about this theft</h3>
          <p>
            If you can help with any information that could help recover this
            item, then please leave details below. The owner will be extremely
            grateful, and will get back in touch with you as quickly as
            possible. This information will only be shared between yourself, the
            owner and any law enforcement authorities.
          </p>
          <form className="mb-3" onSubmit={handleSubmit}>
            <div>
              <TextAreaForm
                colFormat="sro-12"
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
                Report
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

export default StolenResponse;
