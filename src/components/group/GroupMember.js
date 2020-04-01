import React from 'react';
import { Link } from 'react-router-dom';

const GroupMember = ({ groupId, member, groupMember, groupAdmin }) => {
  const { user, permissions, state } = member;

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
                className="fas fa-meh w-25 text-center text-light"
                title="Membership has been requested"
              ></span>
              <span
                className="fas fa-laugh w-25 text-center text-light"
                title="Membership has been approved"
              ></span>
              <span
                className="fas fa-sad-tear w-25 text-center text-light"
                title="Membership has been rejected"
              ></span>
              <span
                className="fas fa-meh-blank w-25 text-center text-light"
                title="Membership has been suspended"
              ></span>
            </span>
          </div>
        </article>
      </div>
    );
  }

  if (!member._id) return renderBlank();

  return (
    <div className="col-6 col-sm-4 col-lg-3 col-xl-2 mb-3">
      <article className="card card-b1">
        {groupAdmin && (
          <span className="icons-top-left pt-1">
            <Link to={`/groups/${groupId}/members/${user._id}/delete`}>
              <span
                className="icon-tray-item fas fa-trash-alt"
                title="Delete member"
              ></span>
            </Link>
          </span>
        )}
        <div className="p-2">
          <img
            className="card-img-top img-thumbnail rounded-circle p-0"
            src={getThumbnail()}
            alt=""
            role="presentation"
          />
        </div>
        <div className="card-body">
          <h3 className="card-title h4 text-truncate">
            {user.lastname
              ? `${user.lastname.toUpperCase()}, ${user.firstname}`
              : 'UNKNOWN'}
          </h3>
          <h4 className="card-title h5 ellipsis">
            {user.username ? user.username : 'Username ?'}
          </h4>
          <p className="card-text">
            {permissions.length > 0 ? permissions.join(', ') : '-'}
          </p>
          <span className="icons-bottom-left">
            <span
              className={`fas fa-meh w-25 text-center ${isRequested()}`}
              title="Membership has been requested if highlighted"
            ></span>
            {groupAdmin && state !== 'left' && (
              <>
                <Link to={`/groups/${groupId}/members/${user._id}/approved`}>
                  <span
                    className={`fas fa-laugh w-25 text-center ${isApproved()}`}
                    title="Approve membership"
                  ></span>
                </Link>
                <Link to={`/groups/${groupId}/members/${user._id}/rejected`}>
                  <span
                    className={`fas fa-sad-tear w-25 text-center ${isRejected()}`}
                    title="Reject membership"
                  ></span>
                </Link>
                <Link to={`/groups/${groupId}/members/${user._id}/suspended`}>
                  <span
                    className={`fas fa-meh-blank w-25 text-center ${isSuspended()}`}
                    title="Suspend membership"
                  ></span>
                </Link>
              </>
            )}
            {!groupAdmin && groupMember && state !== 'left' && (
              <>
                <span
                  className={`fas fa-laugh w-25 text-center ${isApproved()}`}
                  title="Member has been approved if highlighted"
                ></span>
                <span
                  className={`fas fa-sad-tear w-25 text-center ${isRejected()}`}
                  title="Member has been rejected if highlighted"
                ></span>
                <span
                  className={`fas fa-meh-blank w-25 text-center ${isSuspended()}`}
                  title="Member has been suspended if highlighted"
                ></span>
              </>
            )}
            {state === 'left' && (
              <>
                <span
                  className={`fas fa-dizzy w-25 text-center text-danger`}
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
