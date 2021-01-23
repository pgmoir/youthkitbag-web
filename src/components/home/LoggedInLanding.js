import React, { useState, useEffect } from 'react';
import Alert from '../includes/Alert';
import Title from '../includes/title/Title';
import { connect } from 'react-redux';
import {
  userHasGroupMembership,
  userHasGroupAdministration,
  userPreferredKitbagId,
} from '../../utils/user';
import UserAnnouncement from './UserAnnouncement';
import KitbagKitAnnouncement from './KitbagKitAnnouncement';
import KitbagMarketTradeAnnouncement from './KitbagMarketTradeAnnouncement';
import KitbagMarketRecycleAnnouncement from './KitbagMarketRecycleAnnouncement';
import KitbagMarketFoundAnnouncement from './KitbagMarketFoundAnnouncement';
import KitbagMarketLostAnnouncement from './KitbagMarketLostAnnouncement';
import KitbagMarketStolenAnnouncement from './KitbagMarketStolenAnnouncement';
import KitbagMarketWantedAnnouncement from './KitbagMarketWantedAnnouncement';
import GroupAnnouncement from './GroupAnnouncement';
import KitbagAnnouncement from './KitbagAnnouncement';
import KitbagKitAddMoreAdvice from './KitbagKitAddMoreAdvice';
import WelcomeAnnouncement from './WelcomeAnnouncement';
import GroupsMemberRequestsAnnouncement from './GroupsMemberRequestsAnnouncement';
import MarketAnnouncement from './MarketAnnouncement';
import { MarketTypes } from '../../enums/marketTypes.enum';
import KitbagMarketAnnouncement from './KitbagMarketAnnouncement';

const mapStateToProps = (state) => ({
  user: state.user,
});

const LoggedInLanding = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [preferredKitbagId, setPreferredKitbagId] = useState(null);
  const [hasGroupMembership, setHasGroupMembership] = useState(false);
  const [hasGroupAdministration, setHasGroupAdministration] = useState(false);

  const group =
    user.groups && user.groups.length > 0
      ? user.groups
          .filter((g) => g.state === 'approved')
          .find((a) => a.member.state === 'approved')
      : undefined;

  useEffect(() => {
    if (user) {
      setPreferredKitbagId(userPreferredKitbagId(user));
      setHasGroupMembership(userHasGroupMembership(user));
      setHasGroupAdministration(userHasGroupAdministration(user));
      setLoading(false);
    }
  }, [user]);

  return (
    <section
      id="main"
      aria-label="main body of content plus related links and features"
    >
      <Title title="" />
      <WelcomeAnnouncement />
      <Alert />
      <div className="tile is-ancestor">
        <div class="tile is-vertical is-8">
          <div class="tile">
            <div class="tile is-parent is-vertical">
              <KitbagAnnouncement
                loading={loading}
                kitbagId={preferredKitbagId}
              />
            </div>
          </div>
        </div>
        {/* <UserAnnouncement user={user} />
        <GroupAnnouncement
          loading={loading}
          hasGroupMembership={hasGroupMembership}
        />
        {hasGroupAdministration && <GroupsMemberRequestsAnnouncement />}
        <KitbagKitAddMoreAdvice kitbagId={preferredKitbagId} />
        <KitbagKitAnnouncement kitbagId={preferredKitbagId} />
        <KitbagMarketAnnouncement
          group={group}
          description={'trades'}
          marketType={MarketTypes.TRADE}
        />
        <KitbagMarketTradeAnnouncement group={group} />
        <KitbagMarketRecycleAnnouncement group={group} />
        <KitbagMarketFoundAnnouncement group={group} />
        <KitbagMarketLostAnnouncement group={group} />
        <KitbagMarketStolenAnnouncement group={group} />
        <KitbagMarketWantedAnnouncement group={group} />
        <MarketAnnouncement group={group} /> */}
      </div>
    </section>
  );
};

export default connect(mapStateToProps)(LoggedInLanding);
