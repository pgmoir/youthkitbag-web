import classNames from 'classnames';
import React, { useState } from 'react';

import BlankCard from '../kitbag/BlankCard';
import GroupMemberDelete from './GroupMemberDelete';
import GroupMemberState from './GroupMemberState';
import { MemberStates } from '../../enums/memberStates.enum';
import { getImage } from '../../utils/image';
import { ImagesNav } from '../includes/images';
import useCardRowClasses from '../hooks/useCardRowClasses';

const GroupMember = ({ groupId, member, isGroupAdmin, isCard = true }) => {
  const [deleteModalIsActive, setDeleteModalIsActive] = useState(false);
  const [stateModalIsActive, setStateModalIsActive] = useState(false);
  const [imageKey, setImageKey] = useState(0);

  const { user, role, state } = member;

  const {
    wrapperClassNames,
    clickAreaClassNames,
    imageClassNames,
    figureClassNames,
    contentClassNames,
    titleClassNames,
    subtitleClassNames,
  } = useCardRowClasses({ isCard });

  if (!member._id) return <BlankCard isCard={isCard} />;

  const showImage = getImage({
    images: user?.images,
    index: imageKey,
    email: user?.email,
  });

  function viewItem() {
    // do nothing yet
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
      <div className={wrapperClassNames}>
        <div
          className={clickAreaClassNames}
          onClick={() => viewItem()}
          onKeyPress={() => viewItem()}
          role="button"
          tabIndex="0"
        >
          <div className={imageClassNames}>
            <figure className={figureClassNames}>
              <img src={showImage} alt="" role="presentation" />
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
            <ImagesNav
              images={user?.images}
              imageKey={imageKey}
              setImageKey={setImageKey}
            />
          </div>
          <div className={contentClassNames}>
            <div className={titleClassNames}>
              {user.lastName
                ? `${user.lastName.toUpperCase()}, ${user.firstName}`
                : 'UNKNOWN'}
            </div>
            {role && <div className={subtitleClassNames}>{role}</div>}
            {isGroupAdmin && <p className={subtitleClassNames}>{user.email}</p>}
          </div>
        </div>
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
