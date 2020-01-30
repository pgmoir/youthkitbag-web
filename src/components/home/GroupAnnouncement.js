import React from 'react';
import { Link } from 'react-router-dom';

const GroupAnnouncement = () => {
  function renderBlock() {
    return (
      <div className="card border-0">
        <div className="alert alert-primary mb-0" role="alert">
          <h4 className="alert-heading">Join a group</h4>
          <hr />
          <p>
            YouthKitbag currently only allows trading through accredited clubs
            and organisations, to try and ensure safe kit trades and recycling.
          </p>
          <p>
            If you can&apos;t find the club you belong to, ask your club
            administrator or manager to set it up. Or if you run a club or team,
            then go ahead and create a place for your members to share.
          </p>
          <Link className="btn btn-primary" to="/groups">
            Join a group
          </Link>
          <span className="ml-3">or</span>
          <Link className="btn btn-link" to="/groups/new">
            Create a new group
          </Link>
        </div>
      </div>
    );
  }

  return <React.Fragment>{renderBlock()}</React.Fragment>;
};

export default GroupAnnouncement;
