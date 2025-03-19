import React from 'react';
import TextAreaInput from '../../includes/controls/TextAreaInput';
import { MarketResponse } from './MarketResponse';

export const StolenResponse = ({
  values,
  handleChange,
  errors,
  handleSubmit,
}) => {
  return (
    <>
      {values && (
        <MarketResponse
          question="Do you have any information about this theft?"
          explanation="If you can help with any information that could help recover this
          item, then please leave details below. The owner will be extremely
          grateful, and will get back in touch with you as quickly as
          possible. This information will only be shared between yourself,
          the owner and any law enforcement authorities."
          buttonText="Report"
          handleSubmit={handleSubmit}
        >
          <TextAreaInput
            label="Details"
            value={values.details}
            field="details"
            handleChange={handleChange}
            error={errors.details}
          />
        </MarketResponse>
      )}
    </>
  );
};
