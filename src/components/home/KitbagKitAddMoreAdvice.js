import React from 'react';
import { Link } from 'react-router-dom';

const KitbagKitAddMoreAdvice = ({ accountId, doNotShow }) => {
  if (!accountId || !doNotShow) return null;

  return (
    <div className="card border-0">
      <div className="alert alert-info mb-0" role="alert">
        <h2 className="alert-heading">Add more kit</h2>
        <hr />
        <p>
          You only have 10 items stored in your preferred account. Remember to
          record all kit now while it&apos;s fresh and new, and easier to trade
          or order new when the time comes.
        </p>
        <Link className="btn btn-info" to={`/kitbag/kit/${accountId}/new`}>
          Add more kit
        </Link>
        <span className="ml-3">or</span>
        <Link className="btn btn-link" to={`/kitbag/kit/${accountId}`}>
          View kitbag
        </Link>
      </div>
    </div>
  );
};

export default KitbagKitAddMoreAdvice;
