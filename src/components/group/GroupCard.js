import React, { useState } from 'react';
import { GroupStates } from '../../enums/groupStates.enum';
import history from '../../utils/history';
import { getImage } from '../../utils/image';
import BlankCard from '../kitbag/BlankCard';
import GroupState from './GroupState';

const GroupCard = ({ group }) => {
  const [stateModalIsActive, setStateModalIsActive] = useState(false);

  if (!group?._id) return <BlankCard />;

  const { _id, name, activitys, state, memberCount, appAdmin } = group;
  const topImage = getImage({ images: group?.images, index: 0 });

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

  function viewItem(e) {
    history.push(`/groups/${_id}`);
  }

  function editGroup(e) {
    e.stopPropagation();
    setStateModalIsActive(true);
  }

  return (
    <>
      <div className="column is-12-mobile is-4-tablet is-3-desktop is-2-fullhd">
        <article className="card is-clickable" onClick={(e) => viewItem(e)}>
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={topImage} alt={name} role="presentation" />
            </figure>
            {appAdmin && (
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
            )}
            <div className="has-text-right p-2 is-overlay-topright">
              <span className="tag is-dark is-rounded">{memberCount}</span>
            </div>
          </div>
          <div className="card-content">
            <p className="title is-size-5">{name}</p>
            {activitys && (
              <p className="subtitle is-size-6">{activitys.join(', ')}</p>
            )}
          </div>
        </article>
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
