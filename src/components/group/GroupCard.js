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
            className="icon-tray-item fas fa-check-circle text-success"
            title="Group has been approved"
          ></span>
        );
      case 'blocked':
        return (
          <span
            className="icon-tray-item fas fa-times-circle text-danger"
            title="Group has been blocked"
          ></span>
        );
      default:
        return (
          <span
            className="icon-tray-item fas fa-question-circle text-warning"
            title="Group has requested approval"
          ></span>
        );
    }
  }

  function renderBlank() {
    return (
      <div className="col-6 col-md-4 col-lg-3 mb-3">
        <article className="card card-link card-b1">
          <div className="d-flex">
            <div className="blank-square bg-light" />
          </div>
          <div className="card-body">
            <h3 className="card-title h6 ellipsis bg-light hgt-2">&nbsp;</h3>
            <p className="card-text ellipsis bg-light hgt-3">&nbsp;</p>
          </div>
        </article>
      </div>
    );
  }

  const { _id, name, activitys, state, memberCount, appAdmin } = group;

  if (!_id) return renderBlank();

  return (
    <div className="column is-6-mobile is-4-tablet is-3-desktop is-2-fullhd">
      <article className="card">
        {/* <span className="icons-top-left pt-1">
          {appAdmin ? (
            <Link to={`/groups/state/${_id}`}>{renderState(state)}</Link>
          ) : (
            renderState(state)
          )}
        </span>
        <span
          className={`badge badge-pill badge-dark badge-fullsize badge-top-right`}
        >
          {memberCount}
        </span> */}

        <Link to={`/groups/${_id}`}>
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={topImage()} alt={name} role="presentation" />
            </figure>
          </div>
        </Link>

        <div className="card-content">
          <p>{name}</p>
          {activitys && <p>{activitys.join(', ')}</p>}
        </div>
      </article>
    </div>
  );
};

export default GroupCard;
