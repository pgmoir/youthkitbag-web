import React from 'react';
import { TextAreaForm, TextForm } from '../../includes/forms';

const TradeResponded = ({ responseDetails }) => {
  return (
    <React.Fragment>
      {responseDetails && (
        <React.Fragment>
          <h3>Thank you! You made this offer</h3>
          <p>
            Please be patient while the owner of this item considers you&apos;re
            offer. We&apos;re sure they will get back to you soon.
          </p>
          <form className="mb-3">
            <div>
              <TextForm
                colFormat="3-9"
                label="Offered On"
                value={new Date(responseDetails.responseOn).toDateString()}
                readOnly={true}
              />
              <TextForm
                colFormat="3-9"
                label="Offer Price"
                value={`£${responseDetails.responsePrice.toFixed(2)}`}
                readOnly={true}
              />
              <TextAreaForm
                colFormat="sro-12"
                label="Details"
                value={responseDetails.details}
                readOnly={true}
              />
            </div>
          </form>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default TradeResponded;
