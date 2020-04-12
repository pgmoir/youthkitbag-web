import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  fetchMarketKit,
  fetchMarketKitFromKit,
} from '../../../actions/KitbagMarketActions';
import MarketKitForm from './MarketKitForm';
import Title from '../../includes/title/Title';
import Alert from '../../includes/Alert';
import PreMarketTitle from '../../includes/title/PreMarketTitle';

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
  const accountId = match.params.accountId;
  const marketId = match.params.marketId;
  const kitId = match.params.kitId;
  const marketType = match.params.marketType;

  const [market, setMarketKit] = useState({
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
    groups: [],
    marketDetails: [],
    topImage: '/images/default.png',
    imagesToUpload: 0,
  });

  useEffect(() => {
    if (accountId && marketId) {
      fetchMarketKit(accountId, marketId);
    }
  }, [fetchMarketKit, accountId, marketId]);

  useEffect(() => {
    if (accountId && kitId) {
      fetchMarketKitFromKit(accountId, kitId, marketType);
    }
  }, [fetchMarketKitFromKit, accountId, kitId, marketType]);

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

    return <PreMarketTitle market={market} />;
  }

  return (
    <div>
      {getTitle()}
      <section
        id="main"
        className="container-fluid"
        aria-label="main body of content plus related links and features"
      >
        <div className="container">
          <Alert />
          <MarketKitForm accountId={accountId} market={market} />
        </div>
      </section>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketKitPage);
