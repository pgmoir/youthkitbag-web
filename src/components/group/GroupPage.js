import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchGroup } from '../../actions/GroupActions';
import GroupForm from './GroupForm';
import Title from '../includes/title/Title';
import Alert from '../includes/Alert';
import GroupsHelp from '../kitbag/GroupsHelp';
import GroupDisplay from './GroupDisplay';

const mapStateToProps = (state) => ({
  current: state.group.current,
});

const mapDispatchToProps = {
  fetchGroup,
};

const GroupPage = ({ current, fetchGroup, match }) => {
  const { groupId } = match.params;
  const [createGroup, setCreateGroup] = useState(false);
  const [group, setGroup] = useState({
    name: '',
    tagline: '',
    description: '',
    recommendation: '',
    recommendationBy: '',
    email: '',
    website: '',
    location: '',
    activitys: '',
    images: [],
    topImage: '/images/default.png',
    imagesToUpload: 0,
  });

  useEffect(() => {
    if (groupId) {
      if (groupId === 'new') {
        setCreateGroup(true);
      } else {
        fetchGroup(groupId);
      }
    }
  }, [groupId, fetchGroup]);

  useEffect(() => {
    if (current && current._id) {
      const newGroup = {
        ...current,
        imagesToUpload: 0,
      };
      setGroup(newGroup);
    }
  }, [current]);

  function groupIsLoading() {
    return groupId && !group._id && !createGroup;
  }

  function getTitle() {
    if (groupIsLoading()) {
      return 'Loading ...';
    }
    if (createGroup) {
      return 'Create new group';
    }

    return group.name;
  }

  function getIcon() {
    if (groupIsLoading() || !group._id || group.state !== 'approved')
      return null;

    return 'fas fa-certificate text-gold';
  }

  function getIconTitle() {
    if (groupIsLoading() || !group._id || group.state !== 'approved')
      return null;

    return 'Certified group';
  }

  function getGroupMemberStateIcon() {
    switch (group.groupMemberState) {
      case 'requested':
        return (
          <span
            className="fas fa-meh pl-3 text-info"
            title="Membership has been requested"
          ></span>
        );
      case 'approved':
        return (
          <span
            className="fas fa-laugh pl-3 text-success"
            title="Membership has been approved"
          ></span>
        );
      case 'rejected':
        return (
          <span
            className="fas fa-sad-tear pl-3 text-warning"
            title="Membership has been rejected"
          ></span>
        );
      case 'blocked':
        return (
          <span
            className="fas fa-meh-blank pl-3 text-danger"
            title="Membership has been blocked"
          ></span>
        );
      case 'left':
        return (
          <span
            className="fas fa-dizzy pl-3 text-danger"
            title="Left membership"
          ></span>
        );
      default:
        break;
    }
  }

  return (
    <div>
      <Title title={getTitle()} icon={getIcon()} iconTitle={getIconTitle()} />
      <section
        id="main"
        className="container-fluid"
        aria-label="main body of content plus related links and features"
      >
        <div className="container">
          <GroupsHelp />
          <Alert />
          <div className="row pb-3">
            <div className="col-12 col-sm-8">
              {group.groupMemberState && (
                <h2>Your member state {getGroupMemberStateIcon()}</h2>
              )}
              {!group.groupMemberState && (
                <h2>You are not a member of this group</h2>
              )}
            </div>
            <div className="col-12 col-sm-4 mb-3 d-flex justify-content-end">
              <div>
                {group._id &&
                  group.state === 'approved' &&
                  (group.groupAdmin || group.groupMember) && (
                    <Link
                      to={`/groups/${groupId}/members`}
                      className="btn btn-primary"
                    >
                      Members
                    </Link>
                  )}
                {group._id && group.state === 'approved' && !group.groupMember && (
                  <Link
                    to={`/groups/${groupId}/join`}
                    className={`btn btn-primary ${
                      group.groupMemberState ? 'disabled' : ''
                    } ml-3`}
                    disabled={group.groupMemberState}
                  >
                    Join
                  </Link>
                )}
                {group._id && group.state === 'approved' && group.groupMember && (
                  <Link
                    to={`/groups/${groupId}/leave`}
                    className="btn btn-primary ml-3"
                  >
                    Leave
                  </Link>
                )}
              </div>
            </div>
          </div>
          {(group.groupAdmin || createGroup) && <GroupForm group={group} />}
          {!group.groupAdmin && !createGroup && <GroupDisplay group={group} />}
        </div>
      </section>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupPage);
