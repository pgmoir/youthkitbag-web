import React, { useState } from 'react';
import { GroupStates } from '../../enums/groupStates.enum';
import history from '../../utils/history';
import { getImage } from '../../utils/image';
import { ImagesNav } from '../includes/images';
import BlankCard from '../kitbag/BlankCard';
import GroupState from './GroupState';
import useCardRowClasses from '../hooks/useCardRowClasses';

const GroupCard = ({ group, callback, isCard = true }) => {
  const [stateModalIsActive, setStateModalIsActive] = useState(false);
  const [imageKey, setImageKey] = useState(0);

  const {
    _id,
    name,
    images,
    address,
    activitys,
    state,
    memberCount,
    appAdmin,
  } = group;

  const {
    wrapperClassNames,
    clickAreaClassNames,
    imageClassNames,
    figureClassNames,
    contentClassNames,
    titleClassNames,
    subtitleClassNames,
    tagsClassNames,
  } = useCardRowClasses({ isCard });

  if (!group?._id) return <BlankCard isCard={isCard} />;

  const showImage = getImage({ images, index: imageKey });

  function renderState(state) {
    switch (state) {
      case GroupStates.ACTIVE:
        return (
          <span
            className="fas fa-check-circle has-text-success"
            title="Group has been approved"
          ></span>
        );
      case GroupStates.BLOCKED:
        return (
          <span
            className="fas fa-times-circle has-text-warning"
            title="Group has been blocked"
          ></span>
        );
      case GroupStates.DELETED:
        return (
          <span
            className="fas fa-times-circle has-text-danger"
            title="Group has been deleted"
          ></span>
        );
      default:
        return (
          <span
            className="fas fa-question-circle has-text-info"
            title="Group has requested approval"
          ></span>
        );
    }
  }

  function viewItem() {
    history.push(`/groups/${_id}`);
  }

  function editGroup(e) {
    e.stopPropagation();
    setStateModalIsActive(true);
  }

  function searchBy(e, searchFor, by) {
    e.stopPropagation();
    callback({
      searchFor,
      by,
      page: 1,
      pagesize: 24,
      order: 'updatedAt',
      direction: -1,
    });
  }

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
              <img src={showImage} alt={name} role="presentation" />
            </figure>
            {appAdmin ? (
              <div className="has-text-left p-2 is-overlay-topleft">
                <span
                  className="tag is-dark is-medium is-clickable"
                  onClick={(e) => {
                    editGroup(e);
                  }}
                  onKeyPress={(e) => {
                    editGroup(e);
                  }}
                  role="button"
                  tabIndex="0"
                >
                  {renderState(state)}
                </span>
              </div>
            ) : (
              <div className="has-text-left p-2 is-overlay-topleft">
                <span className="tag is-dark is-medium">
                  {renderState(state)}
                </span>
              </div>
            )}
            <div className="has-text-right p-2 is-overlay-topright">
              <span className="tag is-dark is-rounded">{memberCount}</span>
            </div>
            <ImagesNav
              images={images}
              imageKey={imageKey}
              setImageKey={setImageKey}
            />
          </div>
          <div className={contentClassNames}>
            <div className={titleClassNames}>{name}</div>
            {address && <div className={subtitleClassNames}>{address}</div>}
            {activitys && (
              <div className={tagsClassNames}>
                {activitys.map((activity, index) => {
                  return (
                    <span
                      key={index}
                      className="tag is-success is-clickable mb-2"
                      onClick={(e) => searchBy(e, activity, 'activity')}
                      onKeyPress={(e) => searchBy(e, activity, 'activity')}
                      role="button"
                      tabIndex={0}
                    >
                      {activity}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <GroupState
        groupId={group._id}
        groupState={state}
        groupName={name}
        modalIsActive={stateModalIsActive}
        setModalIsActive={setStateModalIsActive}
      />
    </>
  );
};

export default GroupCard;
