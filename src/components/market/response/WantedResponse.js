import React from 'react';
import TextAreaInput from '../../includes/controls/TextAreaInput';
import TextInput from '../../includes/controls/TextInput';
import { MarketResponse } from './MarketResponse';

export const WantedResponse = ({
  values,
  handleChange,
  errors,
  handleSubmit,
}) => {
  return (
    <>
      {values && (
        <MarketResponse
          question="Are you able to supply this item?"
          explanation="If you can help fulfill this wanted request, then please submit an
          asking price, or optionally, leave as 0 (zero) if you're
          willing to donate for free, and include any other relevant
          details. The purchaser will get back to you as quickly as
          possible."
          buttonText="Offer"
          handleSubmit={handleSubmit}
        >
          <TextInput
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
