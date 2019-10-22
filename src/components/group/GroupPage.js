import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchGroup } from '../../actions/GroupActions';
import GroupForm from './GroupForm';
import Title from '../includes/title/Title';
import Alert from '../includes/Alert';

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

  function groupIsLoding() {
    return groupId && !group._id;
  }

  function getTitle() {
    if (groupIsLoding()) {
      return 'Loading ...';
    }

    return group._id ? group.name : 'Create new group';
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
          <Alert />
          <div className="row">
            <div className="col-12 mb-3 d-flex justify-content-end">
              {groupId && group.groupAdmin && group.status !== 'blocked' && (
                <Link
                  to={`/settings/groups/${groupId}/members`}
                  className="btn btn-primary"
                >
                  Members
                </Link>
              )}
              {groupId && group.status !== 'blocked' && !group.groupMember && (
                <Link
                  to={`/settings/groups/${groupId}/join`}
                  className={`btn btn-primary ${
                    group.groupMemberState ? 'disabled' : ''
                  }`}
                  disabled={group.groupMemberState}
                >
                  Join
                </Link>
              )}
              {groupId && group.status !== 'blocked' && group.groupMember && (
                <Link
                  to={`/settings/groups/${groupId}/leave`}
                  className="btn btn-primary"
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

// {(values.appAdmin || values.groupAdmin) && values._id && (
//   <div>
//     <Link
//       className="btn btn-primary"
//       to={`/settings/groups/${values._id}/members`}
//     >
//       Members
//     </Link>
//   </div>
// )}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupPage);
