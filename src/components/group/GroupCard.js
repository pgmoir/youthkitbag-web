import React from 'react';
import { Link } from 'react-router-dom';

const GroupCard = ({ group }) => {
  function topImage() {
    const { images } = group;
    if (!images || images.length === 0) {
      return '/images/default.png';
    }
    return images[0].imageUrl;
  }

  function renderState(state) {
    switch (state) {
      case 'approved':
        return (
          <span
            className="fas fa-check-circle has-text-success"
            title="Group has been approved"
          ></span>
        );
      case 'blocked':
        return (
          <span
            className="fas fa-times-circle has-text-danger"
            title="Group has been blocked"
          ></span>
        );
      default:
        return (
          <span
            className="fas fa-question-circle has-text-warning"
            title="Group has requested approval"
          ></span>
        );
    }
  }

  function renderBlank() {
    return (
      <div className="column is-4-tablet is-3-desktop is-2-fullhd">
        <article className="card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img src="/images/default.png" alt="" role="presentation" />
            </figure>
          </div>
          <div className="card-content">
            <p className="title is-size-5">Loading ...</p>
            <p className="subtitle is-size-6"></p>
            <p className="is-size-6">Members: counting...</p>
          </div>
        </article>
      </div>
    );
  }

  const { _id, name, activitys, state, memberCount, appAdmin } = group;

  if (!_id) return renderBlank();

  return (
    <div className="column is-4-tablet is-3-desktop is-2-fullhd">
      <article className="card">
        <Link to={`/groups/${_id}`}>
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={topImage()} alt={name} role="presentation" />
            </figure>
          </div>
        </Link>
        <div className="card-content">
          <p className="title is-size-5">
            {name}{' '}
            <span className="">
              {appAdmin ? (
                <Link to={`/groups/state/${_id}`}>{renderState(state)}</Link>
              ) : (
                renderState(state)
              )}
            </span>
          </p>
          {activitys && (
            <p className="subtitle is-size-6">{activitys.join(', ')}</p>
          )}
          <p className="is-size-6">Members: {memberCount}</p>
        </div>
      </article>
    </div>
  );
};

export default GroupCard;
