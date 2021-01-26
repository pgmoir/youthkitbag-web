import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  fetchMarketKit,
  fetchMarketKitFromKit,
} from '../../../actions/KitbagMarketActions';
import MarketKitForm from './MarketKitForm';
import Title from '../../includes/title/Title';
import Alert from '../../includes/Alert';
import MarketTitle from '../../includes/title/MarketTitle';

const mapStateToProps = (state) => ({
  current: state.kitbag.market.current,
});

const mapDispatchToProps = {
  fetchMarketKit,
  fetchMarketKitFromKit,
};

const MarketKitPage = ({
  current,
  fetchMarketKit,
  fetchMarketKitFromKit,
  match,
}) => {
  const kitbagId = match.params.kitbagId;
  const marketId = match.params.marketId;
  const kitId = match.params.kitId;
  const marketType = match.params.marketType;

  const [market, setMarketKit] = useState({
    marketType: '',
    title: '',
    subtitle: '',
    description: '',
    location: '',
    images: [],
    activitys: '',
    condition: 'used',
    marketPrice: 0.0,
    marketd: false,
    sourceId: '',
    userId: '',
    security: '',
    tracking: '',
    groups: [],
    marketDetails: [],
    topImage: '/images/default.png',
    imagesToUpload: 0,
  });

  useEffect(() => {
    if (kitbagId && marketId) {
      fetchMarketKit(kitbagId, marketId);
    }
  }, [fetchMarketKit, kitbagId, marketId]);

  useEffect(() => {
    if (kitbagId && kitId) {
      fetchMarketKitFromKit(kitbagId, kitId, marketType);
    }
  }, [fetchMarketKitFromKit, kitbagId, kitId, marketType]);

  useEffect(() => {
    if (current && (current._id || current.sourceId)) {
      const newMarketKit = {
        ...current,
        imagesToUpload: 0,
      };
      setMarketKit(newMarketKit);
    }
  }, [current]);

  function itemIsLoading() {
    return marketId && !market._id;
  }

  function getTitle() {
    if (itemIsLoading()) {
      return <Title title="Loading ..." />;
    }

    return <MarketTitle market={market} isOwned={true} />;
  }

  return (
    <div className="container">
      {getTitle()}
      <Alert />
      <MarketKitForm kitbagId={kitbagId} market={market} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketKitPage);
