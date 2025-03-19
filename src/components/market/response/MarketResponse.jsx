import React from 'react';
import { Link } from 'react-router-dom';

export const MarketResponse = ({
  question,
  explanation,
  children,
  buttonText,
  handleSubmit,
}) => {
  return (
    <div className="content">
      <p className="is-size-6 has-text-weight-medium">{question}</p>
      <p className="is-size-6">{explanation}</p>
      <form onSubmit={handleSubmit}>
        {children}
        <hr />
        <div className="buttons">
          <button className="button is-primary" type="submit">
            {buttonText}
          </button>
          <Link className="button is-warning" to="/market">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};
