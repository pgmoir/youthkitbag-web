import React from 'react';
import history from '../../utils/history';

const GroupCard = ({ group }) => {
  function topImage() {
    const { images } = group;
    if (!images || images.length === 0) {
      return '/images/default.png';
    }
    return images[0].imageUrl;
  }

  function renderBlank() {
    return (
      <div className="column is-4-tablet is-3-desktop is-2-fullhd">
        <article className="card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img src="/images/default.png" alt="" role="presentation" />
            </figure>
            <div className="has-text-right p-2 is-overlay">
              <span className="tag is-dark is-rounded">0</span>
            </div>
          </div>
          <div className="card-content">
            <p className="title is-size-5">Loading ...</p>
            <p className="subtitle is-size-6"></p>
          </div>
        </article>
      </div>
    );
  }

  const { _id, name, activitys, state, memberCount, appAdmin } = group;

  if (!_id) return renderBlank();

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

  function viewItem(e) {
    history.push(`/groups/${_id}`);
  }

  function changeState(e) {
    if (!appAdmin) return;
    console.log('CHANGE ST');
    /* <Link to={`/kitbag/kit/${kitbagId}/delete/${_id}`}> */
  }

  return (
    <div className="column is-4-tablet is-3-desktop is-2-fullhd">
      <article className="card is-clickable" onClick={(e) => viewItem(e)}>
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={topImage()} alt={name} role="presentation" />
          </figure>
          <div className="has-text-right p-2 is-overlay">
            <span className="tag is-dark is-rounded">{memberCount}</span>
          </div>
          <div className="has-text-left p-2 is-overlay">
            <span
              className="tag is-dark is-medium is-clickable"
              onClick={(e) => {
                e.stopPropagation();
                changeState(e);
              }}
            >
              {renderState(state)}
            </span>
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
  );
};

export default GroupCard;
