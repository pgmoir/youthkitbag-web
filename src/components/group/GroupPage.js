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
    description: '',
    recommendation: '',
    recommendationBy: '',
    email: '',
    website: '',
    location: '',
    activitys: [],
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
    <div className="container">
      <Title title={getTitle()} icon={getIcon()} iconTitle={getIconTitle()} />
      <Alert />
      <GroupsHelp />
      <div className="columns">
        <div className="column is-half-width">
          {group.groupMemberState && (
            <h2>Your member state {getGroupMemberStateIcon()}</h2>
          )}
          {!group.groupMemberState && (
            <h2>You are not a member of this group</h2>
          )}
        </div>
        <div className="column is-fullwidth">
          <div className="buttons is-justify-content-flex-end">
            {group._id &&
              group.state === 'approved' &&
              (group.groupAdmin || group.groupMember) && (
                <Link
                  to={`/groups/${groupId}/members`}
                  className="button is-primary"
                >
                  Members
                </Link>
              )}
            {group._id && group.state === 'approved' && !group.groupMember && (
              <Link
                to={`/groups/${groupId}/join`}
                className={`button is-success ${
                  group.groupMemberState ? 'disabled' : ''
                }`}
                disabled={group.groupMemberState}
              >
                Join
              </Link>
            )}
            {group._id && group.state === 'approved' && group.groupMember && (
              <Link to={`/groups/${groupId}/leave`} className="button is-info">
                Leave
              </Link>
            )}
          </div>
        </div>
      </div>

      {(group.groupAdmin || createGroup) && <GroupForm group={group} />}
      {!group.groupAdmin && !createGroup && <GroupDisplay group={group} />}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupPage);
