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

const mapDispatchToProps = {
  fetchGroupMembers,
};

const GroupMembers = ({ fetchGroupMembers, match }) => {
  const { groupId } = match.params;

  const stateSearch = useSelector((state) => state.group.searchMembers);
  const memberEntities = useSelector((state) => state.group.memberEntities);
  const userGroup = useSelector((state) =>
    state.user.groups?.find((group) => group._id === groupId)
  );

  const [search, setSearch] = useState(stateSearch);

  const isGroupAdmin =
    userGroup?.member?.role === MemberRoles.ADMIN &&
    userGroup?.member?.state === MemberStates.APPROVED;

  useEffect(() => {
    if (groupId) {
      fetchGroupMembers({ groupId, pushHistory: true });
    }
  }, [fetchGroupMembers, groupId]);

  function getTitle(includeCount = true) {
    if (includeCount) {
      return `${userGroup?.name} (${Object.keys(memberEntities).length})`;
    }
    return `${userGroup?.name}`;
  }

  function renderBlankList() {
    const blankList = [{}, {}, {}, {}, {}, {}];
    return blankList.map((member, index) => {
      return <GroupMember key={`${index}`} groupId={groupId} member={member} />;
    });
  }

  if (!Object.keys(memberEntities))
    return (
      <div className="container is-fluid px-0">
        <Title title="Loading ...." />
        <div className="columns is-multiline is-mobile is-tablet is-desktop is-fullhd">
          {renderBlankList()}
        </div>
      </div>
    );

  function renderList() {
    return Object.keys(memberEntities).map((key, index) => {
      if (search.by !== 'all' && search.by !== '') {
        if (memberEntities[key].state !== search.by) return null;
      }
      return (
        <GroupMember
          key={`${index}`}
          member={memberEntities[key]}
          groupId={groupId}
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

export default connect(null, mapDispatchToProps)(GroupMembers);
