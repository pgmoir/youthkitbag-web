import React from 'react';
import { Link } from 'react-router-dom';

const KitbagKitAddMoreAdvice = ({ kitbagId }) => {
  if (!kitbagId) return null;

  return (
    <article className="notification is-notification-even is-warning box">
      <h2 className="title">Add more kit</h2>
      <div className="content">
        <p>
          You only have <span className="tag is-rounded">0</span> items stored
          in your preferred kitbag. Remember to record all kit now while
          it&apos;s fresh and new, and easier to trade or order new when the
          time comes.
        </p>
      </div>
      <div className="buttons">
        <Link
          className="button is-warning is-inverted"
          to={`/kitbag/kit/${kitbagId}/new`}
        >
          Add more kit
        </Link>
        <Link
          className="button is-warning is-inverted is-outlined"
          to={`/kitbag/kit/${kitbagId}`}
        >
          View kitbag
        </Link>
      </div>
    </article>
  );
};

export default KitbagKitAddMoreAdvice;
