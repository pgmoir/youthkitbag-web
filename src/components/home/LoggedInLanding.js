import React from 'react';
import Alert from '../includes/Alert';
import Title from '../includes/title/Title';
import { connect } from 'react-redux';
import ProfileAnnouncement from './ProfileAnnouncement';
import MarketAnnouncement from './MarketAnnouncement';
import KitbagKitAnnouncement from './KitbagKitAnnouncement';
import KitbagMarketAnnouncement from './KitbagMarketAnnouncement';
import GroupsAnnouncement from './GroupsAnnouncement';
import AccountAnnouncement from './AccountAnnouncement';

const mapStateToProps = state => ({
  user: state.user
});

const LoggedInLanding = ({ user }) => {
  return (
    <div>
      <section
        id="main"
        className="container-fluid"
        aria-label="main body of content plus related links and features"
      >
        <Title title="Dashboard" />
        <div className="container">
          <Alert />
          <div className="row">
            <ProfileAnnouncement user={user} />
            <AccountAnnouncement />
            <MarketAnnouncement />
            <KitbagKitAnnouncement />
            <KitbagMarketAnnouncement />
            <GroupsAnnouncement />
          </div>
        </div>
      </section>
    </div>
  );
};

export default connect(mapStateToProps, null)(LoggedInLanding);
