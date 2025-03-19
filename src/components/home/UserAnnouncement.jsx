import React from 'react';
import { Link } from 'react-router-dom';

const UserAnnouncement = ({ user }) => {
  function userComplete() {
    const { firstName, lastName, activitys } = user;
    return firstName && lastName && activitys.length > 0;
  }

  if (userComplete()) return null;

  return (
    <article className="notification is-notification-even is-warning box">
      <h2 className="title">Complete your user profile</h2>
      <div className="content">
        <p>
          It appears that you haven&apos;t completed your YouthKitbag user
          profile. It always helps to add a few extra details, so that we can
          identify more relevant resources to show you.
        </p>
      </div>
      <div className="buttons">
        <Link className="button is-warning is-inverted" to="/settings/user">
          Update user profile
        </Link>
      </div>
    </article>
  );
};

export default UserAnnouncement;
