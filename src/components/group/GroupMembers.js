import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchGroupMembers } from '../../actions';
import Title from '../includes/title/Title';
import Alert from '../includes/Alert';
import GroupMember from './GroupMember';
import queryString from 'query-string';
import SearchForm from '../includes/SearchForm';

const mapStateToProps = (state) => ({
  search: state.group.searchMembers,
  memberList: state.group.memberList,
});

const mapDispatchToProps = {
  fetchGroupMembers,
};

const GroupMembers = ({ search, memberList, fetchGroupMembers, match }) => {
  const query = useLocation().search;
  let { searchfor, by, loading } = search;
  if (loading) {
    const searchQuery = queryString.parse(query);
    searchfor = searchQuery.searchfor;
    by = searchQuery.by;
    search = { searchfor, by };
  }

  const groupId = match.params.groupId;

  const [group, setGroup] = useState({});

  useEffect(() => {
    if (memberList) {
      setGroup(selectGroupMembers(by, memberList));
    }
  }, [memberList, by]);

  useEffect(() => {
    if (groupId) {
      fetchGroupMembers(searchfor, by, groupId);
    }
  }, [groupId, searchfor, by, fetchGroupMembers]);

  function selectGroupMembers(by, memberList) {
    if (memberList.members && by && by !== 'all') {
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
            <div className="row">
              <div className="col-12 col-sm-9">
                <SearchForm
                  searchId={groupId}
                  search={search}
                  callback={fetchGroupMembers}
                  incPagination={false}
                />
              </div>
            </div>
            <div className="row">{renderList()}</div>
          </div>
        </section>
      </div>
    );
  }

  return <React.Fragment>{render()}</React.Fragment>;
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupMembers);
