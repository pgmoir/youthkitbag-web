import React from 'react';
import { Link } from 'react-router-dom';

const GroupAnnouncement = ({ hasGroupMembership }) => {
  // if (hasGroupMembership) return null;

  return (
    <article className="tile is-child notification is-info">
      <p className="title">Join a group</p>
      <div className="content">
        <p>
          YouthKitbag currently only allows trading through accredited clubs and
          organisations, to try and ensure safe kit trades and recycling.
        </p>
        <p>
          If you can&apos;t find the club you belong to, ask your club
          administrator or manager to set it up. Or if you run a club or team,
          then go ahead and create a place for your members to share.
        </p>
      </div>
      <div className="buttons">
        <Link className="button is-info is-inverted" to="/groups">
          Join a group
        </Link>
        <Link
          className="button is-info is-inverted is-outlined"
          to="/groups/new"
        >
          Create a new group
        </Link>
      </div>
    </article>
  );
};

export default GroupAnnouncement;
