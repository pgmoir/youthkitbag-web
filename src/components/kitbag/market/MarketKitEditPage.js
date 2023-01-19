import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
  fetchMarketKit,
  fetchMarketKitFromKit
} from '../../../actions/KitbagMarketActions';
import MarketKitEditForm from './MarketKitEditForm';
import Title from '../../includes/title/Title';
import Alert from '../../includes/Alert';
import MarketTitle from '../../includes/title/MarketTitle';
import Breadcrumb from '../../includes/Breadcrumb';
import { ImageUrls } from '../../../enums/imageUrls.enum';
import { useParams } from 'react-router-dom';

const mapStateToProps = (state) => ({
  current: state.kitbag.market.current
});

const mapDispatchToProps = {
  fetchMarketKit,
  fetchMarketKitFromKit
};

const MarketKitEditPage = ({
  current,
  fetchMarketKit,
  fetchMarketKitFromKit
}) => {
  const { kitbagId, marketId, kitId, marketType } = useParams();

  const [market, setMarketKit] = useState({
    marketType: '',
    title: '',
    subtitle: '',
    description: '',
    location: '',
    images: [],
    activitys: [],
    tags: [],
    condition: 'used',
    marketPrice: 0.0,
    marketd: false,
    sourceId: '',
    userId: '',
    security: '',
    tracking: '',
    groups: [],
    marketDetails: [],
    topImage: ImageUrls.DEFAULT,
    imagesToUpload: 0
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
        imagesToUpload: 0
      };
      setMarketKit(newMarketKit);
    }
  }, [current]);

  const crumbs = [
    { title: 'Home', to: '/' },
    { title: 'Market', to: `/market` },
    { title: `${market?.title}` }
  ];

  function getTitle() {
    if (!market) {
      return <Title title="Loading ..." />;
    }

    return <MarketTitle market={market} isOwned={true} />;
  }

  return (
    <div className="main container is-fluid">
      <Breadcrumb crumbs={crumbs} />
      {getTitle()}
      <div className="container">
        <Alert />
        <MarketKitEditForm kitbagId={kitbagId} market={market} />
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketKitEditPage);
