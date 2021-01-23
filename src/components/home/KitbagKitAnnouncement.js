import React from 'react';
import { Link } from 'react-router-dom';

const KitbagKitAnnouncement = ({ kitbagId, doNotShow }) => {
  if (!kitbagId) return null;

  return (
    <article className="tile is-child notification box is-4">
      <p className="title">Kitbag activity</p>
      <p>
        The following items have recently been added, edited or traded in your
        kitbag.
      </p>
      <div className="buttons">
        <Link className="button" to={`/kitbag/kit/${kitbagId}`}>
          View kitbag
        </Link>
      </div>
    </article>
  );
};

export default KitbagKitAnnouncement;
