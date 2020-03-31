import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchGroup } from '../../actions/GroupActions';
import GroupForm from './GroupForm';
import Title from '../includes/title/Title';
import Alert from '../includes/Alert';
import GroupsHelp from '../account/GroupsHelp';
import GroupDisplay from './GroupDisplay';

const mapStateToProps = state => ({
  current: state.group.current
});

const mapDispatchToProps = {
  fetchGroup
};

const GroupPage = ({ current, fetchGroup, match }) => {
  const { groupId } = match.params;
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
    imagesToUpload: 0
  });

  useEffect(() => {
    if (groupId) {
      fetchGroup(groupId);
    }
  }, [fetchGroup, groupId]);

  useEffect(() => {
    if (current && current._id) {
      const newGroup = {
        ...current,
        imagesToUpload: 0
      };
      setGroup(newGroup);
    }
  }, [current]);

  function groupIsLoading() {
    return groupId && !group._id;
  }

  function getTitle() {
    if (groupIsLoading()) {
      return 'Loading ...';
    }
    if (!group._id) {
      return 'Create new group';
    }

    return group.name;
  }

  function getIcon() {
    if (groupIsLoading() || !group._id || group.status !== 'approved')
      return null;

    return 'fas fa-certificate';
  }

  function getGroupMemberStateIcon() {
    switch (group.groupMemberState) {
      case 'requested':
        return <span className="fas fa-meh pl-3 text-info"></span>;
      case 'approved':
        return <span className="fas fa-laugh pl-3 text-success"></span>;
      case 'rejected':
        return <span className="fas fa-sad-tear pl-3 text-warning"></span>;
      case 'blocked':
        return <span className="fas fa-meh-blank pl-3 text-danger"></span>;
      case 'left':
        return <span className="fas fa-dizzy pl-3 text-danger"></span>;
      default:
        break;
    }
  }

  return (
    <div>
      <Title title={getTitle()} icon={getIcon()} />
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
                <h2>Your member status {getGroupMemberStateIcon()}</h2>
              )}
            </div>
            <div className="col-12 col-sm-4 mb-3 d-flex justify-content-end">
              {groupId &&
                group.status === 'approved' &&
                (group.groupAdmin || group.groupMember) && (
                  <Link
                    to={`/groups/${groupId}/members`}
                    className="btn btn-primary"
                  >
                    Members
                  </Link>
                )}
              {groupId && group.status === 'approved' && !group.groupMember && (
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
              {groupId && group.status === 'approved' && group.groupMember && (
                <Link
                  to={`/groups/${groupId}/leave`}
                  className="btn btn-primary ml-3"
                >
                  Leave
                </Link>
              )}
            </div>
          </div>
          {group.groupAdmin && <GroupForm group={group} />}
          {!group.groupAdmin && <GroupDisplay group={group} />}
        </div>
      </section>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupPage);
