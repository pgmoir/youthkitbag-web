import React from 'react';
import { Link } from 'react-router-dom';

const ProfileAnnouncement = () => {
  function renderBlock() {
    return (
      <div className="card border-0">
        <div className="alert alert-warning mb-0" role="alert">
          <h4 className="alert-heading">Complete your profile</h4>
          <hr />
          <p>
            It appears that you haven&apos;t completed your YouthKitbag profile.
            It always helps to add a few extra details, so that we can identify
            more relevant resources to show you.
          </p>
          <Link className="btn btn-warning" to="/settings/profile">
            Update profile
          </Link>
          <span className="ml-3">or</span>
          <button className="btn btn-link">Hide this message</button>
        </div>
      </div>
    );
  }

  return <React.Fragment>{renderBlock()}</React.Fragment>;
};

export default ProfileAnnouncement;
