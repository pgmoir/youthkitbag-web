import React from 'react';

const ProfileAnnouncement = ({ user }) => {
  const { firstname, lastname, username } = user.profile;

  function requiresUpdate() {
    return !firstname || !lastname || !username;
  }

  function renderBlock() {
    if (!requiresUpdate()) return null;

    return (
      <div className="col-12 col-md-6">
        <h3>Profile to update</h3>
        {!username && <p>You have not entered a username.</p>}
        {!firstname && <p>You have not entered a first name.</p>}
        {!lastname && <p>You have not entered a last name.</p>}
      </div>
    );
  }

  return <React.Fragment>{renderBlock()}</React.Fragment>;
};

export default ProfileAnnouncement;
