import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { fetchGroupMembers } from '../../actions';
import Title from '../includes/title/Title';
import Alert from '../includes/Alert';
import GroupMember from './GroupMember';
import SearchForm from '../includes/SearchForm';
import Breadcrumb from '../includes/Breadcrumb';
import { MemberRoles } from '../../enums/memberRoles.enum';
import { MemberStates } from '../../enums/memberStates.enum';
import { useNavigate, useParams } from 'react-router-dom';

const mapDispatchToProps = {
  fetchGroupMembers
};

const GroupMembers = ({ fetchGroupMembers }) => {
  const navigate = useNavigate();
  const { groupId } = useParams();

  const stateSearch = useSelector((state) => state.group.searchMembers);
  const memberEntities = useSelector((state) => state.group.memberEntities);
  const userGroup = useSelector((state) =>
    state.user.groups?.find((group) => group._id === groupId)
  );

  const [search, setSearch] = useState(stateSearch);
  const [displayRow, setDisplayRow] = useState(false);

  const isGroupAdmin =
    userGroup?.member?.role === MemberRoles.ADMIN &&
    userGroup?.member?.state === MemberStates.APPROVED;

  useEffect(() => {
    if (groupId) {
      fetchGroupMembers({ groupId });
      navigate(`/groups/${groupId}/members`);
    }
  }, [fetchGroupMembers, groupId, navigate]);

  function getTitle(includeCount = true) {
    if (includeCount) {
      return `${userGroup?.name} (${Object.keys(memberEntities).length})`;
    }
    return `${userGroup?.name}`;
  }

  function renderBlankList() {
    const blankList = [{}, {}, {}, {}, {}, {}];
    return blankList.map((member, index) => {
      return (
        <GroupMember
          key={`${index}`}
          groupId={groupId}
          member={member}
          isGroupAdmin={false}
        />
      );
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

  function renderCards(isCard) {
    const searchFor = search.searchFor.toLowerCase();
    return Object.keys(memberEntities).map((key, index) => {
      if (search.by !== 'all' && search.by !== '') {
        if (memberEntities[key].state !== search.by) return null;
      }
      if (searchFor !== '') {
        const { firstName, lastName } = memberEntities[key].user;
        if (
          !firstName.toLowerCase().includes(searchFor) &&
          !lastName.toLowerCase().includes(searchFor)
        )
          return null;
      }
      return (
        <GroupMember
          key={`${index}`}
          member={memberEntities[key]}
          groupId={groupId}
          isGroupAdmin={
            isGroupAdmin && memberEntities[key]._id !== userGroup.member._id
          }
          isCard={isCard}
        />
      );
    });
  }

  function updateDisplay() {
    setDisplayRow(!displayRow);
  }

  const crumbs = [
    { title: 'Home', to: '/' },
    { title: 'Groups', to: '/groups' },
    { title: getTitle(false), to: `/groups/${groupId}` },
    { title: 'Members' }
  ];

  return (
    <div className="main container is-fluid">
      <Breadcrumb crumbs={crumbs} />
      <Title
        title={getTitle()}
        icon={displayRow ? 'fas fa-address-card' : 'fas fa-align-justify'}
        iconAction={updateDisplay}
        hasAction={true}
      />
      <Alert />
      <div className="columns">
        <div className="column is-three-quarters">
          <SearchForm
            searchId={groupId}
            search={search}
            callback={setSearch}
            incPagination={false}
            placeholderText="Search group members"
            useInstant={true}
          />
        </div>
      </div>
      {displayRow ? (
        <div className="">{renderCards(false)}</div>
      ) : (
        <div className="columns is-multiline is-mobile is-tablet is-desktop is-fullhd">
          {renderCards(true)}
        </div>
      )}
    </div>
  );
};

export default connect(null, mapDispatchToProps)(GroupMembers);
