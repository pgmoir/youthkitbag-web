import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Title from '../includes/title/Title';
import Alert from '../includes/Alert';
import ProfileForm from './ProfileForm';

const mapStateToProps = state => ({
  current: state.user.profile
});

const PackagePage = ({ current, match }) => {
  const { profileId } = match.params;
  const [profile, setProfile] = useState({
    firstname: '',
    lastname: '',
    username: '',
    location: '',
    activitys: '',
    images: [],
    groups: [],
    badges: [],
    topImage: '/images/default.png',
    imagesToUpload: 0
  });

  useEffect(() => {
    if (current && current._id) {
      const newProfile = {
        ...current,
        imagesToUpload: 0
      };
      setProfile(newProfile);
    }
  }, [current]);

  function profileIsLoding() {
    return profileId && !profile._id;
  }

  function getTitle() {
    if (profileIsLoding()) {
      return 'Loading ...';
    }

    return profile._id
      ? `${profile.lastname.toUpperCase()}, ${profile.firstname}`
      : 'Update profile';
  }

  return (
    <div>
      <Title title={getTitle()} />
      <section
        id="main"
        className="container-fluid"
        aria-label="main body of content plus related links and features"
      >
        <div className="container">
          <Alert />
          <ProfileForm />
        </div>
      </section>
    </div>
  );
};

export default connect(
  mapStateToProps,
  null
)(PackagePage);
