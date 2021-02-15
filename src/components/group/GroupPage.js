import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { fetchGroup } from '../../actions/GroupActions';
import GroupForm from './GroupForm';
import Title from '../includes/title/Title';
import Alert from '../includes/Alert';
import GroupsHelp from '../kitbag/GroupsHelp';
import GroupDisplay from './GroupDisplay';
import Breadcrumb from '../includes/Breadcrumb';
import GroupMemberJoin from './GroupMemberJoin';
import { MemberStates } from '../../enums/memberStates.enum';

const mapStateToProps = (state) => ({
  current: state.group.current,
});

const mapDispatchToProps = {
  fetchGroup,
};

const GroupPage = ({ current, fetchGroup, match }) => {
  const { groupId } = match.params;
  const [createGroup, setCreateGroup] = useState(false);
  const [joinModalIsActive, setJoinModalIsActive] = useState(false);
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

  function joinGroup(e) {
    e.stopPropagation();
    setJoinModalIsActive(true);
  }

  const stateClasses = classNames('tag is-large is-rounded', {
    'is-success': group.groupMemberState === MemberStates.APPROVED,
    'is-info':
      group.groupMemberState === MemberStates.REQUESTED ||
      group.groupMemberState === MemberStates.INVITED,
    'is-warning': group.groupMemberState === MemberStates.REJECTED,
    'is-danger':
      group.groupMemberState === MemberStates.BLOCKED ||
      group.groupMemberState === MemberStates.LEFT,
  });

  const crumbs = [
    { title: 'Home', to: '/' },
    { title: 'Groups', to: '/groups' },
    { title: getTitle() },
  ];

  return (
    <>
      <div className="container">
        <Breadcrumb crumbs={crumbs} />
        <Title title={getTitle()} icon={getIcon()} iconTitle={getIconTitle()} />
        <Alert />
        <GroupsHelp />
        <div className="columns">
          <div className="column is-half-width">
            {group.groupMemberState && (
              <span
                className={stateClasses}
              >{`Your current membership status is "${group.groupMemberState}"`}</span>
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
                <span
                  className={`button is-success is-clickable ${
                    group.groupMemberState ? 'disabled' : ''
                  }`}
                  disabled={group.groupMemberState}
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
              {group._id && group.state === 'approved' && group.groupMember && (
                <Link
                  to={`/groups/${groupId}/leave`}
                  className="button is-info"
                >
                  Leave
                </Link>
              )}
            </div>
          </div>
        </div>

        {group.groupAdmin || createGroup ? (
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
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupPage);
