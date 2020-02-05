import React from 'react';
import { Link } from 'react-router-dom';

const ProfileAnnouncement = ({ profile }) => {
  function profileComplete() {
    const { firstname, lastname, username, activitys } = profile;
    return firstname && lastname && username && activitys.length > 0;
  }

  if (profileComplete()) return null;

  return (
    <div className="card border-0">
      <div className="alert alert-warning mb-0" role="alert">
        <h2 className="alert-heading">Complete your profile</h2>
        <hr />
        <p>
          It appears that you haven&apos;t completed your YouthKitbag profile.
          It always helps to add a few extra details, so that we can identify
          more relevant resources to show you.
        </p>
        <Link className="btn btn-warning" to="/settings/profile">
          Update profile
        </Link>
        {/* <span className="ml-3">or</span>
          <button className="btn btn-link">Hide this message</button> */}
      </div>
    </div>
  );
};

export default ProfileAnnouncement;
