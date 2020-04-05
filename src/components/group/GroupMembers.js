import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchGroupMembers } from '../../actions';
import Title from '../includes/title/Title';
import Alert from '../includes/Alert';
import GroupMember from './GroupMember';
import queryString from 'query-string';

const mapStateToProps = (state) => ({
  memberList: state.group.memberList,
});

const mapDispatchToProps = {
  fetchGroupMembers,
};

const GroupMembers = ({ memberList, fetchGroupMembers, match }) => {
  const { by } = queryString.parse(useLocation().search);
  const groupId = match.params.groupId;

  const [group, setGroup] = useState({});

  useEffect(() => {
    if (memberList) {
      setGroup(selectGroupMembers(by, memberList));
    }
  }, [memberList, by]);

  useEffect(() => {
    if (groupId) {
      fetchGroupMembers(groupId, by);
    }
  }, [groupId, by, fetchGroupMembers]);

  function selectGroupMembers(by, memberList) {
    if (memberList.members && by !== 'all') {
      memberList.members = memberList.members.filter((m) => m.state === by);
    }
    return memberList;
  }

  function getTitle() {
    return `${group.name} (${
      group.members.filter((m) => m.state !== 'left').length
    })`;
  }

  function renderBlank() {
    return (
      <div>
        <Title title="Loading ...." />
        <section
          id="main"
          className="container-fluid"
          aria-label="main body of content plus related links and features"
        >
          <div className="container">
            <div className="row">{renderBlankMembers()}</div>
          </div>
        </section>
      </div>
    );
  }

  function renderBlankMembers() {
    const blankMembers = [{}, {}, {}, {}];
    return blankMembers.map((member, index) => {
      return (
        <GroupMember
          key={`${member._id}-${index}`}
          groupId={groupId}
          member={member}
        />
      );
    });
  }

  function renderList() {
    if (group.members.length === 0) {
      return <h2>There are no members identified</h2>;
    }

    return group.members.map((member, index) => {
      return (
        <GroupMember
          key={`${member._id}-${index}`}
          member={member}
          groupId={group._id}
          groupMember={group.groupMember}
          groupAdmin={group.groupAdmin}
        />
      );
    });
  }

  function render() {
    if (!group._id) return renderBlank();

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
            <div className="row">{renderList()}</div>
          </div>
        </section>
      </div>
    );
  }

  return <React.Fragment>{render()}</React.Fragment>;
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupMembers);
