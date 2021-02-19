import React, { useState, useEffect } from 'react';
import Alert from '../includes/Alert';
import { connect } from 'react-redux';
import {
  userHasGroupMembership,
  userPreferredKitbagId,
} from '../../utils/user';
import UserAnnouncement from './UserAnnouncement';
import KitbagKitAnnouncement from './KitbagKitAnnouncement';
import GroupAnnouncement from './GroupAnnouncement';
import KitbagAnnouncement from './KitbagAnnouncement';
import KitbagKitAddMoreAdvice from './KitbagKitAddMoreAdvice';
import WelcomeAnnouncement from './WelcomeAnnouncement';
import GroupsMemberRequestsAnnouncement from './GroupsMemberRequestsAnnouncement';
import MarketAnnouncement from './MarketAnnouncement';
import { MarketTypes } from '../../enums/marketTypes.enum';
import KitbagMarketAnnouncement from './KitbagMarketAnnouncement';
import KitbagKitLevelWarnings from './KitbagKitLevelWarnings';
import LoadingAnnouncement from './LoadingAnnouncement';
import { GroupStates } from '../../enums/groupStates.enum';
import { MemberStates } from '../../enums/memberStates.enum';

const mapStateToProps = (state) => ({
  user: state.user,
});

const LoggedInLanding = ({ user }) => {
  const [preferredKitbagId, setPreferredKitbagId] = useState(null);
  const [hasGroupMembership, setHasGroupMembership] = useState(false);
  // const [hasGroupAdministration, setHasGroupAdministration] = useState(false);

  const group =
    user.groups && user.groups.length > 0
      ? user.groups
          .filter((g) => g.state === GroupStates.ACTIVE)
          .find((a) => a.member.state === MemberStates.APPROVED)
      : undefined;

  useEffect(() => {
    if (user) {
      setPreferredKitbagId(userPreferredKitbagId(user));
      setHasGroupMembership(userHasGroupMembership(user));
      // setHasGroupAdministration(userHasGroupAdministration(user));
    }
  }, [user]);

  return (
    <div className="container is-fluid px-0">
      <WelcomeAnnouncement />
      <Alert />
      <div className="tile is-ancestor">
        <div className="tile is-vertical is-8">
          <div className="tile">
            <div className="tile is-parent is-vertical">
              <LoadingAnnouncement />
              <KitbagAnnouncement kitbagId={preferredKitbagId} />
              <UserAnnouncement user={user} />
            </div>
            <div className="tile is-parent is-vertical">
              <GroupAnnouncement hasGroupMembership={hasGroupMembership} />
              <GroupsMemberRequestsAnnouncement />
              <KitbagKitLevelWarnings kitbagId={preferredKitbagId} />
            </div>
          </div>
          <div className="tile is-parent is-vertical">
            <KitbagKitAddMoreAdvice kitbagId={preferredKitbagId} />
            <KitbagKitAnnouncement kitbagId={preferredKitbagId} />
            <MarketAnnouncement group={group} />
          </div>
        </div>
        <div className="tile is-parent is-vertical">
          <KitbagMarketAnnouncement
            description={'trades'}
            marketType={MarketTypes.TRADE}
          />
          <KitbagMarketAnnouncement
            description={'recycle items'}
            marketType={MarketTypes.RECYCLE}
          />
          <KitbagMarketAnnouncement
            description={'found items'}
            marketType={MarketTypes.FOUND}
          />
          <KitbagMarketAnnouncement
            description={'lost items'}
            marketType={MarketTypes.LOST}
          />
          <KitbagMarketAnnouncement
            description={'stolen items'}
            marketType={MarketTypes.STOLEN}
          />
          <KitbagMarketAnnouncement
            description={'wanted items'}
            marketType={MarketTypes.WANTED}
          />
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(LoggedInLanding);
