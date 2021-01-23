import React from 'react';
import { Link } from 'react-router-dom';

const UserAnnouncement = ({ user }) => {
  // function userComplete() {
  //   const { firstName, lastName, userName, activitys } = user;
  //   return firstName && lastName && userName && activitys.length > 0;
  // }

  // if (userComplete()) return null;

  return (
    <article className="tile is-child">
      <h2 className="title is-4">Complete your user profile</h2>
      <p>
        It appears that you haven&apos;t completed your YouthKitbag user
        profile. It always helps to add a few extra details, so that we can
        identify more relevant resources to show you.
      </p>
      <div className="buttons">
        <Link className="button is-warning" to="/settings/user">
          Update user profile
        </Link>
      </div>
    </article>
  );
};

export default UserAnnouncement;
