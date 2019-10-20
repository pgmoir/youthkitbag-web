import React from 'react';
import { TextAreaForm, DateForm } from '../../includes/forms';

const LostResponded = ({ responseDetails }) => {
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
              <DateForm
                colFormat="3-9"
                label="Offered On"
                value={responseDetails.responseOn}
                readOnly={true}
              />
              <TextAreaForm
                colFormat="3-9"
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

export default LostResponded;
