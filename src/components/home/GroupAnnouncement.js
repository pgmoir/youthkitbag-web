import React from 'react';
import { Link } from 'react-router-dom';

const GroupAnnouncement = ({ hasGroupMembership, loading }) => {
  // if (hasGroupMembership) return null;

  // if (loading) {
  //   return (
  //     <article className="tile is-child notification box is-4">
  //       <p className="title">Loading ...</p>
  //       <p>Identifying if you are currently a member of any group</p>
  //     </article>
  //   );
  // }

  return (
    <article className="tile is-child">
      <h2 className="title is-4">Join a group</h2>
      <p>
        YouthKitbag currently only allows trading through accredited clubs and
        organisations, to try and ensure safe kit trades and recycling.
      </p>
      <p>
        If you can&apos;t find the club you belong to, ask your club
        administrator or manager to set it up. Or if you run a club or team,
        then go ahead and create a place for your members to share.
      </p>
      <div className="buttons">
        <Link className="button is-primary" to="/groups">
          Join a group
        </Link>
        <span>or</span>
        <Link className="button is-primary is-outlined" to="/groups/new">
          Create a new group
        </Link>
      </div>
    </article>
  );
};

export default GroupAnnouncement;
