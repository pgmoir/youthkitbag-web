import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { fetchGroupMembers } from '../../actions';
import Title from '../includes/title/Title';
import Alert from '../includes/Alert';
import GroupMember from './GroupMember';
import SearchForm from '../includes/SearchForm';
import Breadcrumb from '../includes/Breadcrumb';
import { MemberRoles } from '../../enums/memberRoles.enum';
import { MemberStates } from '../../enums/memberStates.enum';

const mapStateToProps = (state) => ({
  stateSearch: state.group.searchMembers,
  items: state.group.memberList,
});

const mapDispatchToProps = {
  fetchGroupMembers,
};

const GroupMembers = ({ stateSearch, items, fetchGroupMembers, match }) => {
  const { groupId } = match.params;
  const [search, setSearch] = useState(stateSearch);
  const [group, setGroup] = useState({});

  const userGroup = useSelector((state) =>
    state.user.groups?.find((group) => group._id === groupId)
  );

  const isGroupAdmin =
    userGroup?.member?.role === MemberRoles.ADMIN &&
    userGroup?.member?.state === MemberStates.APPROVED;

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

  function getTitle(includeCount = true) {
    if (includeCount) {
      return `${group.name} (${
        group.members.filter((m) => m.state !== 'left').length
      })`;
    }
    return `${group.name}`;
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
      return null;
    }

    return group.members.map((member, index) => {
      return (
        <GroupMember
          key={`${index}`}
          member={member}
          groupId={group._id}
          groupAdmin={isGroupAdmin}
        />
      );
    });
  }

  const crumbs = [
    { title: 'Home', to: '/' },
    { title: 'Groups', to: '/groups' },
    { title: getTitle(false), to: `/groups/${groupId}` },
    { title: 'Members' },
  ];

  return (
    <div className="container is-fluid px-0">
      <Breadcrumb crumbs={crumbs} />
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
