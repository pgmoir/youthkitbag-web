import React from 'react';
import { Link } from 'react-router-dom';

const UserAnnouncement = ({ user }) => {
  function userComplete() {
    const { firstName, lastName, userName, activitys } = user;
    return firstName && lastName && userName && activitys.length > 0;
  }

  if (userComplete()) return null;

  return (
    <div className="card border-0">
      <div className="alert alert-warning mb-0" role="alert">
        <h2 className="alert-heading">Complete your user profile</h2>
        <hr />
        <p>
          It appears that you haven&apos;t completed your YouthKitbag user
          profile. It always helps to add a few extra details, so that we can
          identify more relevant resources to show you.
        </p>
        <Link className="btn btn-warning" to="/settings/user">
          Update user profile
        </Link>
      </div>
    </div>
  );
};

export default UserAnnouncement;
