import React from 'react';
import { TextAreaForm, TextForm } from '../../includes/forms';

const StolenResponded = ({ responseDetails }) => {
  return (
    <React.Fragment>
      {responseDetails && (
        <React.Fragment>
          <h3>Thank you very much for providing this information</h3>
          <p>
            This information will only be shared between yourself, the owner and
            any law enforcement authorities. We hope it helps to secure the safe
            return of this item.
          </p>
          <form className="mb-3">
            <div>
              <TextForm
                colFormat="3-9"
                label="Reported On"
                value={new Date(responseDetails.responseOn).toDateString()}
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

export default StolenResponded;
