import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchGroupsMemberRequests } from '../../actions/GroupActions';
import { getImage } from '../../utils/image';

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

  function renderMemberList(members) {
    return (
      <>
        {members.map((m, index) => {
          const userProfileImageUrl = getImage({
            images: [m.user?.image],
            index: 0,
            email: m.user?.email,
          });
          if (index < 5) {
            return (
              <div key={index} className="image has-avatar-overlap">
                <img
                  src={userProfileImageUrl}
                  className="is-avatar is-rounded is-48x48"
                  alt={`${m.user?.firstName} ${m.user?.lastName}`}
                />
              </div>
            );
          } else {
            return null;
          }
        })}
        {members.length > 5 && (
          <div
            key={members.length}
            className="image has-avatar-overlap is-align-self-center"
          >
            <span className="tag is-large is-rounded is-primary">{`+${
              members.length - 5
            }`}</span>
          </div>
        )}
      </>
    );
  }

  function renderList() {
    return groupsWithMemberRequests.map((g, index) => {
      return (
        <div key={index} className="is-flex">
          <div className="is-flex-shrink-0 is-flex-grow-0 pr-4">
            <div className="image">
              <img
                src={getImage({ images: g.images, index: 0 })}
                className="is-avatar is-rounded is-48x48"
                alt=""
              />
            </div>
          </div>
          <div className="is-flex-grow-1 is-flex">
            <div className="is-flex-grow-0 has-truncated is-align-self-center mr-3">
              <div className="has-text-weight-medium is-truncated-text">
                {g.name}
              </div>
            </div>
            <div className="is-flex-grow-1 is-flex is-flex-wrap-nowrap">
              {renderMemberList(g.members)}
            </div>
          </div>
        </div>
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
        <div>{renderList()}</div>
      </div>
      <div className="buttons">
        <Link className="button is-info is-inverted" to="/groups?">
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
