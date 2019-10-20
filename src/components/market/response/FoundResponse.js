import React from 'react';
import { Link } from 'react-router-dom';
import { TextAreaForm } from '../../includes/forms';

const FoundResponse = ({ values, handleChange, errors, handleSubmit }) => {
  return (
    <React.Fragment>
      {values && (
        <React.Fragment>
          <h3>Does this item belong to you</h3>
          <p>
            If you have lost this item, then please leave details below. The
            person who found the item will get back to you as quickly as
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
                errors={errors.details}
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
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default FoundResponse;
