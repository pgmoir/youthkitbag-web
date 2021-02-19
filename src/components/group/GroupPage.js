import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import React, { useState, useEffect } from 'react';

import { fetchGroup } from '../../actions/GroupActions';
import { MemberStates } from '../../enums/memberStates.enum';
import Alert from '../includes/Alert';
import Breadcrumb from '../includes/Breadcrumb';
import GroupDisplay from './GroupDisplay';
import GroupForm from './GroupForm';
import GroupMemberJoin from './GroupMemberJoin';
import GroupMemberLeave from './GroupMemberLeave';
import GroupsHelp from '../kitbag/GroupsHelp';
import Title from '../includes/title/Title';
import { GroupStates } from '../../enums/groupStates.enum';
import { MemberRoles } from '../../enums/memberRoles.enum';

const mapDispatchToProps = {
  fetchGroup,
};

const GroupPage = ({ fetchGroup, match }) => {
  const { groupId } = match.params;

  const current = useSelector((state) => {
    return state.group.entities[groupId];
  });

  const [createGroup, setCreateGroup] = useState(false);
  const [joinModalIsActive, setJoinModalIsActive] = useState(false);
  const [leaveModalIsActive, setLeaveModalIsActive] = useState(false);
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

  const canLeaveStates = [
    MemberStates.APPROVED,
    MemberStates.INVITED,
    MemberStates.REQUESTED,
  ];

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

  const isGroupAdmin =
    group.state !== GroupStates.BLOCKED &&
    group.state !== GroupStates.DELETED &&
    group.groupMemberRole === MemberRoles.ADMIN &&
    group.groupMemberState === MemberStates.APPROVED;

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
    if (!isGroupAdmin) return null;

    return 'fas fa-crown text-gold';
  }

  function getCurrentState() {
    if (!group._id) return null;

    if (group.state === GroupStates.REQUESTED) {
      return (
        <span className="tag is-large is-rounded is-warning">
          This group is currently awaiting approval and members cannot join
        </span>
      );
    }

    if ([GroupStates.BLOCKED, GroupStates.DELETED].includes(group.state)) {
      return (
        <span className="tag is-large is-rounded is-danger">
          {`This group has been ${group.state} and members cannot join`}
        </span>
      );
    }

    const stateClasses = classNames('tag is-large is-rounded', {
      'is-success': group.groupMemberState === MemberStates.APPROVED,
      'is-info': [MemberStates.REQUESTED, MemberStates.INVITED].includes(
        group.groupMemberState
      ),
      'is-warning': group.groupMemberState === MemberStates.REJECTED,
      'is-danger': [MemberStates.SUSPENDED, MemberStates.LEFT].includes(
        group.groupMemberState
      ),
    });

    if (group.groupMemberState) {
      return (
        <span
          className={stateClasses}
        >{`Your current membership status is "${group.groupMemberState}"`}</span>
      );
    }

    return (
      <span className="tag is-large is-rounded is-link">
        You are currently not a member of this group
      </span>
    );
  }

  function joinGroup(e) {
    e.stopPropagation();
    setJoinModalIsActive(true);
  }

  function leaveGroup(e) {
    e.stopPropagation();
    setLeaveModalIsActive(true);
  }

  function canJoin() {
    return (
      !group.groupMemberState || group.groupMemberState === MemberStates.LEFT
    );
  }

  function canLeave() {
    return canLeaveStates.includes(group.groupMemberState);
  }

  const crumbs = [
    { title: 'Home', to: '/' },
    { title: 'Groups', to: '/groups' },
    { title: getTitle() },
  ];

  return (
    <>
      <div className="container">
        <Breadcrumb crumbs={crumbs} />
        <Title title={getTitle()} icon={getIcon()} />
        <Alert />
        <GroupsHelp />
        <div className="columns">
          <div className="column is-half-width">{getCurrentState()}</div>
          {group._id && group.state === GroupStates.ACTIVE && (
            <div className="column is-fullwidth">
              <div className="buttons is-justify-content-flex-end">
                {isGroupAdmin && (
                  <Link
                    to={`/groups/${groupId}/members`}
                    className="button is-primary"
                  >
                    Members
                  </Link>
                )}
                {canJoin() && (
                  <span
                    className="button is-success is-clickable"
                    onClick={(e) => {
                      joinGroup(e);
                    }}
                    onKeyPress={(e) => {
                      joinGroup(e);
                    }}
                    role="button"
                    tabIndex="0"
                  >
                    Join
                  </span>
                )}
                {canLeave() && (
                  <span
                    className="button is-info is-clickable"
                    onClick={(e) => {
                      leaveGroup(e);
                    }}
                    onKeyPress={(e) => {
                      leaveGroup(e);
                    }}
                    role="button"
                    tabIndex="0"
                  >
                    Leave
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {isGroupAdmin || createGroup ? (
          <GroupForm group={group} />
        ) : (
          <GroupDisplay group={group} />
        )}
      </div>
      <GroupMemberJoin
        groupId={groupId}
        name={group.name}
        modalIsActive={joinModalIsActive}
        setModalIsActive={setJoinModalIsActive}
      />
      <GroupMemberLeave
        groupId={groupId}
        name={group.name}
        modalIsActive={leaveModalIsActive}
        setModalIsActive={setLeaveModalIsActive}
      />
    </>
  );
};

export default connect(null, mapDispatchToProps)(GroupPage);
