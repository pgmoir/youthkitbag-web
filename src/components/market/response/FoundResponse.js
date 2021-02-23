import React from 'react';
import TextAreaInput from '../../includes/controls/TextAreaInput';
import { MarketResponse } from './MarketResponse';

export const FoundResponse = ({
  values,
  handleChange,
  errors,
  handleSubmit,
}) => {
  return (
    <>
      {values && (
        <MarketResponse
          question="Does this item belong to you?"
          explanation="If you have lost this item, then please leave details below. The
          person who found the item will get back to you as quickly as
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
