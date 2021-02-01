import React from 'react';
import { Link } from 'react-router-dom';

const GroupMember = ({ groupId, member, groupMember, groupAdmin }) => {
  const { user, roles, state } = member;

  //TODO: fix this
  groupAdmin = true;

  function getThumbnail() {
    return member.user.image;
  }

  function isRequested() {
    if (state === 'requested') return 'text-info';
    return 'text-light';
  }

  function isApproved() {
    if (state === 'approved') return 'text-success';
    return 'text-muted';
  }

  function isRejected() {
    if (state === 'rejected') return 'text-warning';
    return 'text-muted';
  }

  function isSuspended() {
    if (state === 'suspended') return 'text-danger';
    return 'text-muted';
  }

  function renderBlank() {
    return (
      <div className="col-6 col-sm-4 col-lg-3 col-xl-2 mb-3">
        <article className="card card-b1">
          <div className="d-flex p-2">
            <div className="blank-circle bg-light" />
          </div>
          <div className="card-body">
            <h3 className="card-title h4 ellipsis bg-light hgt-2">&nbsp;</h3>
            <h4 className="card-title h5 ellipsis bg-light hgt-2">&nbsp;</h4>
            <p className="card-text bg-light hgt-1">&nbsp;</p>
            <span className="icons-bottom-left">
              <span
                className="fas fa-meh w-25 has-text-centered text-light"
                title="Membership has been requested"
              ></span>
              <span
                className="fas fa-laugh w-25 has-text-centered text-light"
                title="Membership has been approved"
              ></span>
              <span
                className="fas fa-sad-tear w-25 has-text-centered text-light"
                title="Membership has been rejected"
              ></span>
              <span
                className="fas fa-meh-blank w-25 has-text-centered text-light"
                title="Membership has been suspended"
              ></span>
            </span>
          </div>
        </article>
      </div>
    );
  }

  if (!member._id) return renderBlank();

  function deleteItem(e) {
    console.log('DELETE');
    // <Link to={`/groups/${groupId}/members/${member._id}/delete`}>
  }

  return (
    <div className="column is-12-mobile is-4-tablet is-3-desktop is-2-fullhd">
      <article className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img
              className="card-img-top img-thumbnail rounded-circle p-0"
              src={getThumbnail()}
              alt=""
              role="presentation"
            />
          </figure>
          {groupAdmin && (
            <div className="has-text-left p-2 is-overlay">
              <span
                className="tag is-danger is-medium is-clickable"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteItem(e);
                }}
              >
                <span
                  className="fas fa-trash-alt"
                  title="Delete kit item"
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
          <p className="subtitle is-size-6">
            {user.userName ? user.userName : 'Username ?'}
          </p>
          <p className="subtitle is-size-6">
            {roles.length > 0 ? roles.join(', ') : '-'}
          </p>
          <span className="icons-bottom-left">
            <span
              className={`fas fa-meh w-25 has-text-centered ${isRequested()}`}
              title="Membership has been requested if highlighted"
            ></span>
            {groupAdmin && state !== 'left' && (
              <>
                <Link to={`/groups/${groupId}/members/${member._id}/approved`}>
                  <span className="sr-only">Approve membership</span>
                  <span
                    className={`fas fa-laugh w-25 has-text-centered ${isApproved()}`}
                    title="Approve membership"
                  ></span>
                </Link>
                <Link to={`/groups/${groupId}/members/${member._id}/rejected`}>
                  <span className="sr-only">Reject membership</span>
                  <span
                    className={`fas fa-sad-tear w-25 has-text-centered ${isRejected()}`}
                    title="Reject membership"
                  ></span>
                </Link>
                <Link to={`/groups/${groupId}/members/${member._id}/suspended`}>
                  <span className="sr-only">Suspend membership</span>
                  <span
                    className={`fas fa-meh-blank w-25 has-text-centered ${isSuspended()}`}
                    title="Suspend membership"
                  ></span>
                </Link>
              </>
            )}
            {!groupAdmin && groupMember && state !== 'left' && (
              <>
                <span
                  className={`fas fa-laugh w-25 has-text-centered ${isApproved()}`}
                  title="Member has been approved if highlighted"
                ></span>
                <span
                  className={`fas fa-sad-tear w-25 has-text-centered ${isRejected()}`}
                  title="Member has been rejected if highlighted"
                ></span>
                <span
                  className={`fas fa-meh-blank w-25 has-text-centered ${isSuspended()}`}
                  title="Member has been suspended if highlighted"
                ></span>
              </>
            )}
            {state === 'left' && (
              <>
                <span
                  className={`fas fa-dizzy w-25 has-text-centered text-danger`}
                  title="Member has left group"
                ></span>
              </>
            )}
          </span>
        </div>
      </article>
    </div>
  );
};

export default GroupMember;
