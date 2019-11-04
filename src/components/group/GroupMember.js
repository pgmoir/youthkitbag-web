import React from 'react';
import { Link } from 'react-router-dom';

class GroupMember extends React.Component {
  getThumbnail() {
    if (this.props.member.user.images.length) {
      return this.props.member.user.images[0].imageUrl;
    }
    return '/images/defaultthumb.png';
  }

  isRequested() {
    if (this.props.member.state === 'requested') return 'text-info';
    return 'text-light';
  }

  isApproved() {
    if (this.props.member.state === 'approved') return 'text-success';
    return 'text-muted';
  }

  isRejected() {
    if (this.props.member.state === 'rejected') return 'text-warning';
    return 'text-muted';
  }

  isSuspended() {
    if (this.props.member.state === 'suspended') return 'text-danger';
    return 'text-muted';
  }

  renderBlank() {
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
              <span className="fas fa-meh w-25 text-center text-light"></span>
              <span className="fas fa-laugh w-25 text-center text-light"></span>
              <span className="fas fa-sad-tear w-25 text-center text-light"></span>
              <span className="fas fa-meh-blank w-25 text-center text-light"></span>
            </span>
          </div>
        </article>
      </div>
    );
  }

  render() {
    if (!this.props.member._id) return this.renderBlank();

    const { user, permissions } = this.props.member;
    const groupId = this.props.groupId;
    return (
      <div className="col-6 col-sm-4 col-lg-3 col-xl-2 mb-3">
        <article className="card card-b1">
          <div className="p-2">
            <img
              className="card-img-top img-thumbnail rounded-circle p-0"
              src={this.getThumbnail()}
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
                className={`fas fa-meh w-25 text-center ${this.isRequested()}`}
              ></span>
              <Link
                to={`/groups/${groupId}/members/${user._id}/approved`}
              >
                <span
                  className={`fas fa-laugh w-25 text-center ${this.isApproved()}`}
                ></span>
              </Link>
              <Link
                to={`/groups/${groupId}/members/${user._id}/rejected`}
              >
                <span
                  className={`fas fa-sad-tear w-25 text-center ${this.isRejected()}`}
                ></span>
              </Link>
              <Link
                to={`/groups/${groupId}/members/${user._id}/suspended`}
              >
                <span
                  className={`fas fa-meh-blank w-25 text-center ${this.isSuspended()}`}
                ></span>
              </Link>
            </span>
          </div>
        </article>
      </div>
    );
  }
}

export default GroupMember;
