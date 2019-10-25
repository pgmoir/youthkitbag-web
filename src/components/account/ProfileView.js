import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProfileForm = () => {
  const user = useSelector(state => state.user);

  function stateIcon(state, permissons) {
    switch (state) {
      case 'approved':
        return permissons.includes('admin') ? 'fa-user-shield' : 'fa-user';
      case 'rejected':
        return 'fa-user-times';
      case 'suspended':
        return 'fa-user-slash';
      default:
        return 'fa-user-circle';
    }
  }

  function renderGroupImages() {
    if (!user || !user.profile || !user.profile.groups) {
      return null;
    }

    const items = [];

    for (let i = 0; i < user.profile.groups.length; i++) {
      const group = user.profile.groups[i];
      const id = group._id;
      const member = group.members[0];
      items.push(
        <div key={`groups${i}`} className="carousel-thumbnail d-inline-flex">
          <React.Fragment>
            <Link to={`/settings/groups/${id}`}>
              <span className="icons-top-left">
                <i
                  aria-hidden="true"
                  className={`fas ${stateIcon(
                    member.state,
                    member.permissions
                  )} icon-tray-item ykb-${member.state}`}
                  title=""
                ></i>
              </span>
              <img
                className="img-fluid mb-3 mini-img mr-1"
                src={group.images[0].imageUrl}
                alt={group.name}
                role="presentation"
              />
            </Link>
          </React.Fragment>
        </div>
      );
    }

    return <div>{items}</div>;
  }

  function renderBadges() {
    if (!user || !user.profile || !user.profile.badges) {
      return null;
    }

    const items = [];

    for (let i = 0; i < user.profile.badges.length; i++) {
      items.push(
        <div key={`badge${i}`} className="carousel-thumbnail d-inline-flex">
          <React.Fragment>
            <img
              className="img-fluid mb-3 mini-img mr-1"
              src={user.profile.badges[i].images[0].imageUrl}
              alt={user.profile.badges[i].name}
              role="presentation"
            />
          </React.Fragment>
        </div>
      );
    }

    return <div>{items}</div>;
  }

  return (
    <div className="row">
      <div className="col-12 col-lg-6 pb-3" role="main">
        <h3 className="h5 pb-2">
          Profile
          <Link className="pl-3" to="/settings/account/profile">
            edit
          </Link>
        </h3>
        {user.profile && (
          <dl className="row">
            <dt className="col-3 pb-2">Last Name</dt>
            <dd className="col-9 pb-2">{user.profile.lastname}</dd>
            <dt className="col-3 pb-2">First Name</dt>
            <dd className="col-9 pb-2">{user.profile.firstname}</dd>
            <dt className="col-3 pb-2">Username</dt>
            <dd className="col-9 pb-2">{user.profile.username}</dd>
            <dt className="col-3 pb-2">Email</dt>
            <dd className="col-9 pb-2">{user.email}</dd>
            {/* <dt className="col-3 pb-2">Location</dt>
            <dd className="col-9 pb-2">{user.profile.location}</dd> */}
            <dt className="col-3 pb-2">Activities</dt>
            <dd className="col-9 pb-2">
              {user.profile.activitys
                ? user.profile.activitys.join(', ')
                : 'None'}
            </dd>
          </dl>
        )}
        <h3 className="h5 pb-2">
          Package
          <Link className="pl-3" to="/pricing">
            upgrade
          </Link>
        </h3>
        {user.package && (
          <dl className="row">
            <dt className="col-3 pb-2">Name</dt>
            <dd className="col-9 pb-2">{user.package.name}</dd>
            <dt className="col-3 pb-2">Icon</dt>
            <dd className="col-9 pb-2">{user.package.icon}</dd>
            <dt className="col-3 pb-2">Kit</dt>
            <dd className="col-9 pb-2">
              {user.package.size.kit} of {user.package.max.kit}
            </dd>
            <dt className="col-3 pb-2">Market</dt>
            <dd className="col-9 pb-2">
              {user.package.size.market} of {user.package.max.market}
            </dd>
            <dt className="col-3 pb-2">Photos</dt>
            <dd className="col-9 pb-2">
              {user.package.size.photos} of {user.package.max.photos}
            </dd>
            <dt className="col-3 pb-2">Groups</dt>
            <dd className="col-9 pb-2">
              {user.package.size.groups} of {user.package.max.groups}
            </dd>
            <dt className="col-3 pb-2">Group Admins</dt>
            <dd className="col-9 pb-2">
              {user.package.size.groupadmins} of {user.package.max.groupadmins}
            </dd>
          </dl>
        )}
      </div>
      <div className="col-12 col-lg-6 pb-3" role="main">
        <h3 className="h5 pb-2">
          Groups
          <Link className="pl-3" to="/settings/groups">
            join / leave
          </Link>
        </h3>
        <div>{renderGroupImages()}</div>
        <h3 className="h5 pb-2">
          Badges Awarded
          <Link className="pl-3" to="/badges">
            view all badges
          </Link>
        </h3>
        <div>{renderBadges()}</div>
      </div>
    </div>
  );
};

export default ProfileForm;
