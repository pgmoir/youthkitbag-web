import React from 'react';
import Icon1 from '../../../images/groupmembership.svg';
import Icon2 from '../../../images/groupsafety.svg';
import Icon3 from '../../../images/grouptradeonly.svg';
import {
  GroupsH2,
  GroupsIcon,
  GroupsP,
  GroupsCard,
  GroupsContainer,
  GroupsH1,
  GroupsWrapper,
} from './GroupElements';

const Groups = () => {
  return (
    <GroupsContainer id="trust">
      <GroupsH1>Trust in Groups</GroupsH1>
      <GroupsWrapper>
        <GroupsCard>
          <GroupsIcon src={Icon1} />
          <GroupsH2>Membership</GroupsH2>
          <GroupsP>Recognised and authenticated groups</GroupsP>
        </GroupsCard>
        <GroupsCard>
          <GroupsIcon src={Icon2} />
          <GroupsH2>Safety</GroupsH2>
          <GroupsP>Approved and authorised members</GroupsP>
        </GroupsCard>
        <GroupsCard>
          <GroupsIcon src={Icon3} />
          <GroupsH2>Trade</GroupsH2>
          <GroupsP>With the people you know and trust</GroupsP>
        </GroupsCard>
      </GroupsWrapper>
    </GroupsContainer>
  );
};

export default Groups;
