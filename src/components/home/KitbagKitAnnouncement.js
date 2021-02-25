import React from 'react';
import { Link } from 'react-router-dom';

const KitbagKitAnnouncement = ({ kitbagId }) => {
  // if (!kitbagId) return null;

  return (
    <article className="tile is-child notification is-danger">
      <h2 className="title">Kitbag activity</h2>
      <div className="content">
        <p>
          The following items have recently been added, edited or traded in your
          kitbag.
        </p>
      </div>
      <div className="buttons">
        <Link
          className="button is-danger is-inverted"
          to={`/kitbag/kit/${kitbagId}`}
        >
          View kitbag
        </Link>
      </div>
    </article>
  );
};

export default KitbagKitAnnouncement;
