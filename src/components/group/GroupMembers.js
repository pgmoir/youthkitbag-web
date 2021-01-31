import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchGroupMembers } from '../../actions';
import Title from '../includes/title/Title';
import Alert from '../includes/Alert';
import GroupMember from './GroupMember';
import SearchForm from '../includes/SearchForm';

const mapStateToProps = (state) => ({
  stateSearch: state.group.searchMembers,
  items: state.group.memberList,
});

const mapDispatchToProps = {
  fetchGroupMembers,
};

const GroupMembers = ({ stateSearch, items, fetchGroupMembers, match }) => {
  const [search, setSearch] = useState(stateSearch);
  const [groupId] = useState(match.params.groupId);

  const [group, setGroup] = useState({});

  useEffect(() => {
    if (items) {
      setGroup(selectGroupMembers(search.by, items));
    }
  }, [items, search]);

  useEffect(() => {
    if (groupId) {
      fetchGroupMembers({ ...search, groupId, pushHistory: true });
    }
  }, [search, fetchGroupMembers, groupId]);

  function selectGroupMembers(by, items) {
    if (items.members && by && by !== 'all') {
      items.members = items.members.filter((m) => m.state === by);
    }
    return items;
  }

  function getTitle() {
    return `${group.name} (${
      group.members.filter((m) => m.state !== 'left').length
    })`;
  }

  function renderBlankList() {
    const blankList = [{}, {}, {}, {}, {}, {}];
    return blankList.map((member, index) => {
      return <GroupMember key={`${index}`} groupId={groupId} member={member} />;
    });
  }

  if (!group._id)
    return (
      <div className="container is-fluid px-0">
        <Title title="Loading ...." />
        <div className="columns is-multiline is-mobile is-tablet is-desktop is-fullhd">
          {renderBlankList()}
        </div>
      </div>
    );

  function renderList() {
    if (group.members.length === 0) {
      return <h2 className="subtitle">There are no members identified</h2>;
    }

    return group.members.map((member, index) => {
      return (
        <GroupMember
          key={`${index}`}
          member={member}
          groupId={group._id}
          groupMember={group.groupMember}
          groupAdmin={group.groupAdmin}
        />
      );
    });
  }

  return (
    <div className="container is-fluid px-0">
      <Title title={getTitle()} />
      <Alert />
      <div className="columns">
        <div className="column is-three-quarters">
          <SearchForm
            searchId={groupId}
            search={search}
            callback={setSearch}
            incPagination={false}
            placeholderText="Search group members"
          />
        </div>
      </div>
      <div className="columns is-multiline is-mobile is-tablet is-desktop is-fullhd">
        {renderList()}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupMembers);
