import React, { useState, useEffect } from 'react';
import Alert from '../includes/Alert';
import { connect, useSelector } from 'react-redux';
import Masonry from 'react-masonry-css';
import WelcomeAnnouncement from './WelcomeAnnouncement';
import UserAnnouncement from './UserAnnouncement';
import KitbagAnnouncement from './KitbagAnnouncement';
import GroupAnnouncement from './GroupAnnouncement';
import GroupsMemberRequestsAnnouncement from './GroupsMemberRequestsAnnouncement';
import KitbagKitLevelWarnings from './KitbagKitLevelWarnings';
import KitbagKitAnnouncement from './KitbagKitAnnouncement';
import MarketAnnouncement from './MarketAnnouncement';
import KitbagMarketAnnouncement from './KitbagMarketAnnouncement';
import {
  userHasGroupMembership,
  userPreferredKitbagId,
} from '../../utils/user';
import {
  fetchKitbagMarketItems,
  fetchRecentKitbagKits,
  fetchGroupsMemberRequests,
  fetchWarningsKitbagKits,
} from '../../actions';
import { MarketTypes } from '../../enums/marketTypes.enum';
import { GroupStates } from '../../enums/groupStates.enum';
import { MemberStates } from '../../enums/memberStates.enum';

const mapDispatchToProps = {
  fetchKitbagMarketItems,
  fetchRecentKitbagKits,
  fetchGroupsMemberRequests,
  fetchWarningsKitbagKits,
};

const LoggedInLanding = ({
  fetchKitbagMarketItems,
  fetchRecentKitbagKits,
  fetchGroupsMemberRequests,
  fetchWarningsKitbagKits,
}) => {
  const user = useSelector((state) => state.user);

  const [preferredKitbagId, setPreferredKitbagId] = useState(null);
  const [hasGroupMembership, setHasGroupMembership] = useState(false);

  const group =
    user.groups && user.groups.length > 0
      ? user.groups
          .filter((g) => g.state === GroupStates.ACTIVE)
          .find((a) => a.member.state === MemberStates.APPROVED)
      : undefined;

  useEffect(() => {
    if (user._id) {
      const kitbagId = userPreferredKitbagId(user);
      setPreferredKitbagId(kitbagId);

      if (kitbagId) {
        fetchRecentKitbagKits({ created: true, days: 7, kitbagId });
        fetchRecentKitbagKits({ created: false, days: 7, kitbagId });
      }

      const hasGroup = userHasGroupMembership(user);
      setHasGroupMembership(hasGroup);

      if (hasGroup) {
        fetchKitbagMarketItems({ by: MarketTypes.TRADE, pagesize: 5 });
        fetchKitbagMarketItems({ by: MarketTypes.RECYCLE, pagesize: 5 });
        fetchKitbagMarketItems({ by: MarketTypes.FOUND, pagesize: 5 });
        fetchKitbagMarketItems({ by: MarketTypes.LOST, pagesize: 5 });
        fetchKitbagMarketItems({ by: MarketTypes.STOLEN, pagesize: 5 });
        fetchKitbagMarketItems({ by: MarketTypes.WANTED, pagesize: 5 });
        fetchGroupsMemberRequests();
        fetchWarningsKitbagKits({ kitbagId });
      }
    }
  }, [
    user,
    fetchKitbagMarketItems,
    fetchRecentKitbagKits,
    fetchGroupsMemberRequests,
    fetchWarningsKitbagKits,
  ]);

  const masonryBreakpoints = {
    default: 4,
    2400: 3,
    1600: 2,
    1023: 1,
  };

  return (
    <div className="main container is-fluid">
      <Alert />
      <Masonry
        breakpointCols={masonryBreakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        <WelcomeAnnouncement />
        <UserAnnouncement user={user} />
        <KitbagAnnouncement kitbagId={preferredKitbagId} />
        <GroupAnnouncement hasGroupMembership={hasGroupMembership} />
        <GroupsMemberRequestsAnnouncement />
        <KitbagKitLevelWarnings kitbagId={preferredKitbagId} />
        {/* <KitbagKitAddMoreAdvice /> */}
        <KitbagKitAnnouncement kitbagId={preferredKitbagId} created={true} />
        <KitbagKitAnnouncement kitbagId={preferredKitbagId} created={false} />
        <MarketAnnouncement group={group} />
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
      </Masonry>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(LoggedInLanding);
