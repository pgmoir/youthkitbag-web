import React from 'react';
import Alert from '../includes/Alert';
import Title from '../includes/title/Title';
import { connect } from 'react-redux';
import ProfileAnnouncement from './ProfileAnnouncement';
import MarketAnnouncement from './MarketAnnouncement';
import KitbagKitAnnouncement from './KitbagKitAnnouncement';
import KitbagMarketTradeAnnouncement from './KitbagMarketTradeAnnouncement';
import KitbagMarketRecycleAnnouncement from './KitbagMarketRecycleAnnouncement';
import KitbagMarketStolenAnnouncement from './KitbagMarketStolenAnnouncement';
import KitbagMarketWantedAnnouncement from './KitbagMarketWantedAnnouncement';
import GroupAnnouncement from './GroupAnnouncement';
import AccountAnnouncement from './AccountAnnouncement';
import KitbagKitLevelWarnings from './KitbagKitLevelWarnings';
import KitbagKitAddMoreAdvice from './KitbagKitAddMoreAdvice';
import WelcomeAnnouncement from './WelcomeAnnouncement';

const mapStateToProps = state => ({
  user: state.user
});

const LoggedInLanding = ({ user }) => {
  const accountId =
    user.profile.accounts && user.profile.accounts.length > 0
      ? user.profile.accounts.find(a => a.preferred)._id
      : undefined;

  const group =
    user.profile.groups && user.profile.groups.length > 0
      ? user.profile.groups
          .filter(g => g.status === 'approved')
          .find(a => a.member.state === 'approved')
      : undefined;

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
              <AccountAnnouncement accountId={accountId} />
              <ProfileAnnouncement profile={user.profile} />
              <GroupAnnouncement group={group} />
              <MarketAnnouncement group={group} />
              <KitbagKitAddMoreAdvice accountId={accountId} />
              <KitbagKitAnnouncement accountId={accountId} />
              <KitbagMarketTradeAnnouncement group={group} />
              <KitbagMarketRecycleAnnouncement group={group} />
              <KitbagMarketStolenAnnouncement group={group} />
              <KitbagMarketWantedAnnouncement group={group} />
              <KitbagKitLevelWarnings accountId={accountId} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default connect(mapStateToProps)(LoggedInLanding);
