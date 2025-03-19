import React from 'react';
import TextAreaInput from '../../includes/controls/TextAreaInput';
import TextInput from '../../includes/controls/TextInput';
import { MarketResponse } from './MarketResponse';

export const TradeResponse = ({
  values,
  handleChange,
  errors,
  handleSubmit,
}) => {
  return (
    <>
      {values && (
        <MarketResponse
          question="Are you interested in this item?"
          explanation="If you are interested in aquiring this item, then please submit an
        offer price you're willing to pay, or leave as 0 (zero) hif te
        item is being offered for free and add any other relevant details
        below. The owner will get back to you as quickly as possible."
          buttonText="Offer"
          handleSubmit={handleSubmit}
        >
          <TextInput
            type="number"
            label="Offer Price"
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
