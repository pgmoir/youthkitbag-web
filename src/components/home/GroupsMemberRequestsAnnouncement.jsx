import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getImage } from '../../utils/image';

const GroupsMemberRequestsAnnouncement = () => {
  const navigate = useNavigate();
  
  const [groupsWithMemberRequests, setGroupsWithMemberRequests] = useState([]);
  const groupsMemberRequests = useSelector(
    (state) => state.group.memberRequests
  );

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

  // http://localhost:3000/groups/602ec91fb0ed8434fd5a217d/members
  function viewMembersList(group) {
    navigate(`/groups/${group._id}/members`);
  }

  function renderMemberList(members) {
    return (
      <>
        {members.map((member, index) => {
          const userProfileImageUrl = getImage({
            images: member.user?.images,
            index: 0,
            email: member.user?.email
          });
          if (index < 5) {
            return (
              <div key={member._id} className="image has-avatar-overlap">
                <img
                  src={userProfileImageUrl}
                  className="is-avatar is-rounded is-48x48"
                  alt={`${member.user?.firstName} ${member.user?.lastName}`}
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
            className="image has-avatar-overlap is-overlap-counter"
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
    return groupsWithMemberRequests.map((group) => {
      return (
        <div
          key={group._id}
          className="box is-flex is-align-items-center is-clickable p-3"
          role="button"
          onClick={() => viewMembersList(group)}
          tabIndex="0"
        >
          <div className="is-flex-shrink-0 is-flex-grow-0 pr-4">
            <div className="image">
              <img
                src={getImage({ images: group.images, index: 0 })}
                className="is-avatar is-rounded is-48x48"
                alt=""
              />
            </div>
          </div>
          <div className="is-flex is-flex-direction-column is-flex-grow-1 has-truncated">
            <div className="is-truncated-text has-text-weight-medium">
              {group.name}
            </div>
            <div className="is-truncated-text">{`You have ${group.members.length} member request`}</div>
          </div>
          <div className="is-flex-shrink-0 is-flex-grow-0 pl-4 has-avatars  is-align-items-center ">
            {renderMemberList(group.members)}
          </div>
        </div>
      );
    });
  }

  return (
    <article className="notification is-notification-even is-info box">
      <h2 className="title">Member requests</h2>
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

export default GroupsMemberRequestsAnnouncement;
