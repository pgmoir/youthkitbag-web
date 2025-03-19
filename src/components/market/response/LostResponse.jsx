import React from 'react';
import TextAreaInput from '../../includes/controls/TextAreaInput';
import { MarketResponse } from './MarketResponse';

export const LostResponse = ({
  values,
  handleChange,
  errors,
  handleSubmit,
}) => {
  return (
    <>
      {values && (
        <MarketResponse
          question="Have any information about this item?"
          explanation="If you can help with any information that could help recover this
            item, then please leave details below. The owner will be extremely
            grateful, and will get back in touch with you as quickly as
            possible."
          buttonText="Offer"
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
