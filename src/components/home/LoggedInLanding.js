import React, { useState, useEffect } from 'react';
import Alert from '../includes/Alert';
import Title from '../includes/title/Title';
import { connect } from 'react-redux';
import {
  userHasGroupMembership,
  userHasGroupAdministration,
  userPreferredAccountId,
} from '../../utils/user';
import ProfileAnnouncement from './ProfileAnnouncement';
import KitbagKitAnnouncement from './KitbagKitAnnouncement';
import KitbagMarketTradeAnnouncement from './KitbagMarketTradeAnnouncement';
import KitbagMarketRecycleAnnouncement from './KitbagMarketRecycleAnnouncement';
import KitbagMarketFoundAnnouncement from './KitbagMarketFoundAnnouncement';
import KitbagMarketLostAnnouncement from './KitbagMarketLostAnnouncement';
import KitbagMarketStolenAnnouncement from './KitbagMarketStolenAnnouncement';
import KitbagMarketWantedAnnouncement from './KitbagMarketWantedAnnouncement';
import GroupAnnouncement from './GroupAnnouncement';
import AccountAnnouncement from './AccountAnnouncement';
import KitbagKitAddMoreAdvice from './KitbagKitAddMoreAdvice';
import WelcomeAnnouncement from './WelcomeAnnouncement';
import GroupsMemberRequestsAnnouncement from './GroupsMemberRequestsAnnouncement';

const mapStateToProps = (state) => ({
  user: state.user,
});

const LoggedInLanding = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [preferredAccountId, setPreferredAccountId] = useState(null);
  const [hasGroupMembership, setHasGroupMembership] = useState(false);
  const [hasGroupAdministration, setHasGroupAdministration] = useState(false);

  const group =
    user.profile.groups && user.profile.groups.length > 0
      ? user.profile.groups
          .filter((g) => g.status === 'approved')
          .find((a) => a.member.state === 'approved')
      : undefined;

  useEffect(() => {
    if (user) {
      setPreferredAccountId(userPreferredAccountId(user));
      setHasGroupMembership(userHasGroupMembership(user));
      setHasGroupAdministration(userHasGroupAdministration(user));
      setLoading(false);
    }
  }, [user]);

  return (
    <div>
      <section
        id="main"
        className="container-fluid"
        aria-label="main body of content plus related links and features"
      >
        <Title title="" />
        <WelcomeAnnouncement />
        <div className="container">
          <Alert />
          <div className="row">
            <div className="card-columns">
              <AccountAnnouncement
                loading={loading}
                accountId={preferredAccountId}
              />
              <ProfileAnnouncement profile={user.profile} />
              <GroupAnnouncement
                loading={loading}
                hasGroupMembership={hasGroupMembership}
              />
              {hasGroupAdministration && <GroupsMemberRequestsAnnouncement />}
              <KitbagKitAddMoreAdvice accountId={preferredAccountId} />
              <KitbagKitAnnouncement accountId={preferredAccountId} />
              <KitbagMarketTradeAnnouncement group={group} />
              <KitbagMarketRecycleAnnouncement group={group} />
              <KitbagMarketFoundAnnouncement group={group} />
              <KitbagMarketLostAnnouncement group={group} />
              <KitbagMarketStolenAnnouncement group={group} />
              <KitbagMarketWantedAnnouncement group={group} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default connect(mapStateToProps)(LoggedInLanding);
