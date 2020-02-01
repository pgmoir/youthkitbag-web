import React from 'react';
import Alert from '../includes/Alert';
import Title from '../includes/title/Title';
import { connect } from 'react-redux';
import ProfileAnnouncement from './ProfileAnnouncement';
import MarketAnnouncement from './MarketAnnouncement';
import KitbagKitAnnouncement from './KitbagKitAnnouncement';
import KitbagMarketAnnouncement from './KitbagMarketAnnouncement';
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
    user &&
    user.profile &&
    user.profile.accounts &&
    user.profile.accounts.length > 0
      ? user.profile.accounts.find(a => a.preferred)._id
      : undefined;

  return (
    <div>
      <section
        id="main"
        className="container-fluid"
        aria-label="main body of content plus related links and features"
      >
        <Title title="" />
        <div className="container">
          <Alert />
          <WelcomeAnnouncement userId={user.profile._id} />
          <div className="row">
            <div className="card-columns">
              <AccountAnnouncement />
              <ProfileAnnouncement user={user} />
              <GroupAnnouncement />
              <MarketAnnouncement />
              <KitbagKitAddMoreAdvice accountId={accountId} />
              <KitbagKitAnnouncement accountId={accountId} />
              <KitbagMarketAnnouncement />
              <KitbagKitLevelWarnings />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default connect(mapStateToProps)(LoggedInLanding);
