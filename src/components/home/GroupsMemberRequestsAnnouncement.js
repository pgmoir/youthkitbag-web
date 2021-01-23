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

  // if (!groupsWithMemberRequests || groupsWithMemberRequests.length === 0)
  //   return null;

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
    return (
      <>
        <div className="img-avatars">
          {members.map((m, index) => {
            if (index < 5) {
              return (
                <span key={index} className="img-overlap-avatar">
                  <img
                    className="img-avatar-lg img-thumbnail img-link rounded-circle p-0 m-1"
                    src={m.user.image}
                    alt={m.user.userName}
                  />
                </span>
              );
            } else {
              return null;
            }
          })}
        </div>
        {members.length > 5 && <span>+ {members.length - 5}</span>}
      </>
    );
  }

  function renderList() {
    return groupsWithMemberRequests.map((g, index) => {
      return (
        <Link
          className="a-inherit a11y-highlight"
          key={index}
          to={`/groups/${g._id}/members?searchfor=&by=requested`}
        >
          <div className="bg-white d-flex flex-row align-items-center mb-2">
            <div className="pl-1 py-1 pr-2">
              <img
                src={topImage(g.images)}
                alt=""
                className="img-fluid img-thumbnail img-small"
              />
            </div>
            <div className="">
              <h3 className="h6 ellipsis mb-0 mr-3">{g.name}</h3>
              {renderMemberList(g.members)}
            </div>
          </div>
        </Link>
      );
    });
  }

  return (
    <article className="tile is-child notification is-info">
      <p className="title">Member requests</p>
      <div className="content">
        <p>
          You have <span className="tag is-rounded">{requestsCount}</span>{' '}
          outstanding member requests in{' '}
          <span className="tag is-rounded">{groupsCount}</span> of the groups
          you administer.
        </p>
      </div>
      {/* <div className="mb-3">{renderList()}</div> */}
      <div className="buttons">
        <Link className="button is-info is-inverted" to="/groups">
          View all your groups
        </Link>
      </div>
    </article>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupsMemberRequestsAnnouncement);
