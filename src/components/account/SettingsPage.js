import React, { useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { getUser } from '../../actions/UserActions';
import Title from '../includes/title/Title';
import ProfileForm from './ProfileForm';
import FamilyForm from './FamilyForm';
import GroupsForm from './GroupsForm';
import PackageForm from './PackageForm';
import BadgesPage from './BadgesPage';

const SettingsPage = ({ profile }) => {
  const [page, setPage] = useState(null);

  const Profile = () => {
    setPage('profile');
    return (
      <div>
        <h2>Profile</h2>
        <ProfileForm profile={profile} />
      </div>
    );
  };

  const Family = () => {
    setPage('family');
    return (
      <div>
        <h2>Family</h2>
        <FamilyForm profile={profile} />
      </div>
    );
  };

  const Groups = () => {
    setPage('groups');
    return (
      <div>
        <h2>Groups</h2>
        <GroupsForm profile={profile} />
      </div>
    );
  };

  const Package = () => {
    setPage('package');
    return (
      <div>
        <h2>Package</h2>
        <PackageForm profile={profile} />
      </div>
    );
  };

  const Badges = () => {
    setPage('badges');
    return (
      <div>
        <h2>Badges</h2>
        <BadgesPage badges={profile.badges} />
      </div>
    );
  };

  return (
    <Router>
      <div>
        <Title title="Account Settings" />
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-3 pb-3 pr-5">
              <ul className="list-group">
                <li
                  className={`list-group-item ${
                    page === 'profile' ? 'active' : ''
                  }`}
                >
                  <Link to="/settings/profile">Profile</Link>
                </li>
                <li
                  className={`list-group-item ${
                    page === 'groups' ? 'active' : ''
                  }`}
                >
                  <Link to="/settings/groups">Groups</Link>
                </li>
                <li
                  className={`list-group-item ${
                    page === 'family' ? 'active' : ''
                  }`}
                >
                  <Link to="/settings/family">Family</Link>
                </li>
                <li
                  className={`list-group-item ${
                    page === 'package' ? 'active' : ''
                  }`}
                >
                  <Link to="/settings/package">Package</Link>
                </li>
                <li
                  className={`list-group-item ${
                    page === 'badges' ? 'active' : ''
                  }`}
                >
                  <Link to="/settings/badges">Badges</Link>
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-8">
              <Route path="/settings/profile" component={Profile} />
              <Route path="/settings/family" component={Family} />
              <Route path="/settings/groups" component={Groups} />
              <Route path="/settings/package" component={Package} />
              <Route path="/settings/badges" component={Badges} />
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

const mapStateToProps = state => ({
  profile: state.user.profile
});

const mapDispatchToProps = {
  getUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage);
