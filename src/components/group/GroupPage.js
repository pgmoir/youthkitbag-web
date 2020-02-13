import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchGroup } from '../../actions/GroupActions';
import GroupForm from './GroupForm';
import Title from '../includes/title/Title';
import Alert from '../includes/Alert';
import GroupsHelp from '../account/GroupsHelp';

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
    const groupMemberState = group.groupMemberState
      ? ` (member: ${group.groupMemberState})`
      : '';
    return `${group.name} - ${group.status}${groupMemberState}`;
  }

  return (
    <div>
      <Title title={getTitle()} />
      <section
        id="main"
        className="container-fluid"
        aria-label="main body of content plus related links and features"
      >
        <div className="container">
          <GroupsHelp />
          <Alert />
          <div className="row">
            <div className="col-12 mb-3 d-flex justify-content-end">
              {groupId && group.groupAdmin && group.status === 'approved' && (
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
          <GroupForm group={group} />
        </div>
      </section>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupPage);
