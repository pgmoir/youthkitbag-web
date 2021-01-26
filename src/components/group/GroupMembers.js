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
              placeholderText="Search members"
            />
          </div>
        </div>
        <div className="columns is-multiline is-mobile is-tablet is-desktop is-fullhd">
          {renderList()}
        </div>
      </div>
    );
  }

  return <>{render()}</>;
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupMembers);
