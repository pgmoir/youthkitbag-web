import classNames from 'classnames';
import React, { useState } from 'react';

import BlankCard from '../kitbag/BlankCard';
import GroupMemberDelete from './GroupMemberDelete';
import { MemberStates } from '../../enums/memberStates.enum';

const GroupMember = ({ groupId, member, groupAdmin }) => {
  const [modalIsActive, setModalIsActive] = useState(false);

  const { user, role, state } = member;

  if (!member._id) return <BlankCard />;

  function getThumbnail() {
    return member.user.image;
  }

  function deleteItem(e) {
    e.stopPropagation();
    setModalIsActive(true);
    // <Link to={`/groups/${groupId}/members/${member._id}/delete`}>
  }

  const stateClasses = classNames('tag is-rounded', {
    'is-success': state === MemberStates.APPROVED,
    'is-info': state === MemberStates.REQUESTED,
    'is-warning': state === MemberStates.REJECTED,
    'is-danger': state === MemberStates.BLOCKED,
  });

  return (
    <>
      <div className="column is-12-mobile is-4-tablet is-3-desktop is-2-fullhd">
        <article className="card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={getThumbnail()} alt="" role="presentation" />
            </figure>
            <div className="has-text-right p-2 is-overlay">
              <span className={stateClasses}>{state}</span>
            </div>
            {groupAdmin && (
              <div className="has-text-left p-2 is-overlay">
                <span
                  className="tag is-danger is-medium is-clickable"
                  onClick={(e) => {
                    deleteItem(e);
                  }}
                  onKeyPress={(e) => {
                    deleteItem(e);
                  }}
                  role="button"
                  tabIndex="0"
                >
                  <span
                    className="fas fa-trash-alt"
                    title="Delete member"
                  ></span>
                </span>
              </div>
            )}
          </div>
          <div className="card-content">
            <p className="title is-size-5">
              {user.lastName
                ? `${user.lastName.toUpperCase()}, ${user.firstName}`
                : 'UNKNOWN'}
            </p>
            <p className="subtitle is-size-6">{role}</p>
            {groupAdmin && <p className="subtitle is-size-6">{user.email}</p>}
          </div>
        </article>
      </div>
      <GroupMemberDelete
        groupId={groupId}
        memberId={member._id}
        user={user}
        modalIsActive={modalIsActive}
        setModalIsActive={setModalIsActive}
      />
    </>
  );
};

export default GroupMember;
