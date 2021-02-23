import classNames from 'classnames';
import React, { useState } from 'react';

import BlankCard from '../kitbag/BlankCard';
import GroupMemberDelete from './GroupMemberDelete';
import GroupMemberState from './GroupMemberState';
import { MemberStates } from '../../enums/memberStates.enum';
import { getImage } from '../../utils/image';

const GroupMember = ({ groupId, member, isGroupAdmin }) => {
  const [deleteModalIsActive, setDeleteModalIsActive] = useState(false);
  const [stateModalIsActive, setStateModalIsActive] = useState(false);

  const { user, role, state } = member;

  if (!member._id) return <BlankCard />;

  function userProfileImageUrl() {
    return getImage({
      images: member.user?.images,
      index: 0,
      email: member.user?.email,
    });
  }

  function deleteMember(e) {
    e.stopPropagation();
    setDeleteModalIsActive(true);
  }

  function editMember(e) {
    e.stopPropagation();
    setStateModalIsActive(true);
  }

  const stateClasses = classNames('tag is-rounded', {
    'is-clickable': isGroupAdmin,
    'is-success': state === MemberStates.APPROVED,
    'is-info': state === MemberStates.REQUESTED,
    'is-warning': state === MemberStates.REJECTED,
    'is-danger': state === MemberStates.SUSPENDED,
  });

  return (
    <>
      <div className="column is-12-mobile is-4-tablet is-3-desktop is-2-fullhd">
        <article className="card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={userProfileImageUrl()} alt="" role="presentation" />
            </figure>
            {isGroupAdmin ? (
              <>
                <div className="has-text-left p-2 is-overlay-topleft">
                  <span
                    className="tag is-danger is-medium is-clickable"
                    onClick={(e) => {
                      deleteMember(e);
                    }}
                    onKeyPress={(e) => {
                      deleteMember(e);
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
                <div className="has-text-right p-2 is-overlay-topright">
                  <span
                    className={stateClasses}
                    onClick={(e) => {
                      editMember(e);
                    }}
                    onKeyPress={(e) => {
                      editMember(e);
                    }}
                    role="button"
                    tabIndex="0"
                  >
                    {state}
                  </span>
                </div>
              </>
            ) : (
              <div className="has-text-right p-2 is-overlay-topright">
                <span className={stateClasses}>{state}</span>
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
            {isGroupAdmin && <p className="subtitle is-size-6">{user.email}</p>}
          </div>
        </article>
      </div>
      <GroupMemberDelete
        groupId={groupId}
        memberId={member._id}
        user={user}
        modalIsActive={deleteModalIsActive}
        setModalIsActive={setDeleteModalIsActive}
      />
      <GroupMemberState
        groupId={groupId}
        memberId={member._id}
        memberState={state}
        user={user}
        modalIsActive={stateModalIsActive}
        setModalIsActive={setStateModalIsActive}
      />
    </>
  );
};

export default GroupMember;
