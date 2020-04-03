import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchGroupsMemberRequests } from '../../actions/GroupActions';

const mapStateToProps = (state) => ({
  groupsMemberRequests: state.group.memberRequests,
});

const mapDispatchToProps = {
  fetchGroupsMemberRequests,
};

const GroupsMemberRequestsAnnouncement = ({
  groupsMemberRequests,
  fetchGroupsMemberRequests,
}) => {
  const [groupsWithMemberRequests, setGroupsWithMemberRequests] = useState([]);

  useEffect(() => {
    fetchGroupsMemberRequests();
  }, [fetchGroupsMemberRequests]);

  useEffect(() => {
    if (groupsMemberRequests) {
      setGroupsWithMemberRequests(
        groupsMemberRequests.filter((g) => g.members && g.members.length > 0)
      );
    }
  }, [groupsMemberRequests]);

  if (!groupsWithMemberRequests || groupsWithMemberRequests.length === 0)
    return null;

  const groupsCount = groupsWithMemberRequests.length;
  const requestsCount = groupsWithMemberRequests.reduce(function (total, g) {
    return total + g.members.length;
  }, 0);

  function topImage(images) {
    if (!images || images.length === 0) {
      return '/images/default.png';
    }
    return images[0].imageUrl;
  }

  function renderMemberList(members) {
    return members.map((m, index) => {
      return (
        <span key={index} className="img-overlap-avatar">
          <img
            className="img-avatar-lg img-thumbnail img-link rounded-circle p-0 m-1"
            src={m.user.image}
            alt={m.user.username}
          />
        </span>
      );
    });
  }

  function renderList() {
    return groupsWithMemberRequests.map((g, index) => {
      return (
        <Link className="a-inherit" key={index} to={`/groups/${g._id}/members`}>
          <div className="bg-white d-flex flex-row align-items-center mb-2">
            <div className="pl-1 py-1 pr-2">
              <img
                src={topImage(g.images)}
                alt="{g.name}"
                className="img-fluid img-thumbnail img-small"
              />
            </div>
            <div className="">
              <h3 className="h6 ellipsis mb-0 mr-3">{g.name}</h3>
              <div className="img-avatars">{renderMemberList(g.members)}</div>
            </div>
          </div>
        </Link>
      );
    });
  }

  return (
    <div className="card border-0">
      <div className="alert alert-primary mb-0" role="alert">
        <h2 className="alert-heading">Member requests</h2>
        <p>
          You have{' '}
          <span className={`badge badge-pill badge-dark`}>{requestsCount}</span>{' '}
          outstanding member requests in{' '}
          <span className={`badge badge-pill badge-dark`}>{groupsCount}</span>{' '}
          of the groups you administer.
        </p>
        <div className="mb-3">{renderList()}</div>
        <p className="mb-1">
          <Link to="/groups">View all your groups</Link>
        </p>
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupsMemberRequestsAnnouncement);
