import React from 'react';
import { Link } from 'react-router-dom';
import { TextAreaForm, TextForm } from '../../includes/forms';

const TradeResponse = ({ values, handleChange, errors, handleSubmit }) => {
  return (
    <React.Fragment>
      {values && (
        <React.Fragment>
          <h3>Are you interested in this item</h3>
          <p>
            If you are interested in aquiring this item, then make an offer and
            leave details below. The owner will get back to you as quickly as
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
              <TextForm
                colFormat="3-9"
                type="number"
                label="Offer Price"
                value={values.responsePrice}
                field="responsePrice"
                step=".01"
                min="0"
                max="99999.99"
                handleChange={handleChange}
                error={errors.responsePrice}
              />
            </div>
            <hr />
            <div>
              <button className="btn btn-primary" type="submit">
                Offer
              </button>
              <Link className="btn btn-link" to="/market">
                Cancel
              </Link>
            </div>
          </form>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default TradeResponse;
