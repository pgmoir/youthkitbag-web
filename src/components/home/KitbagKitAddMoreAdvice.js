import React from 'react';
import { Link } from 'react-router-dom';

const KitbagKitAddMoreAdvice = ({ kitbagId }) => {
  if (!kitbagId) return null;

  return (
    <article className="tile is-child notification box is-4">
      <p className="title">Add more kit</p>
      <p>
        You only have <span className={`badge badge-pill badge-dark`}>X</span>{' '}
        items stored in your preferred kitbag. Remember to record all kit now
        while it&apos;s fresh and new, and easier to trade or order new when the
        time comes.
      </p>
      <div className="buttons">
        <Link className="button" to={`/kitbag/kit/${kitbagId}/new`}>
          Add more kit
        </Link>
        <span>or</span>
        <Link className="button" to={`/kitbag/kit/${kitbagId}`}>
          View kitbag
        </Link>
      </div>
    </article>
  );
};

export default KitbagKitAddMoreAdvice;
