import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMarketItem } from '../../actions/MarketActions';
import MarketItemDetails from './MarketItemDetails';
import Title from '../includes/title/Title';
import Alert from '../includes/Alert';

const mapStateToProps = state => ({
  current: state.market.current
});

const mapDispatchToProps = {
  fetchMarketItem
};

const MarketItemViewPage = ({ current, fetchMarketItem, match }) => {
  const marketId = match.params.marketId;

  const [market, setTrade] = useState({
    title: 'Loading requested item of market ...',
    marketType: '',
    subtitle: '',
    description: '',
    location: '',
    images: [],
    activitys: '',
    condition: '',
    security: '',
    tracking: '',
    occurredOn: '',
    freeTrade: false,
    marketPrice: 0.0,
    completed: false,
    topImage: '/images/default.png'
  });

  useEffect(() => {
    fetchMarketItem(marketId);
  }, [fetchMarketItem, marketId]);

  useEffect(() => {
    if (current && current._id) {
      setTrade(current);
    }
  }, [current]);

  return (
    <div>
      <Title
        title={
          !market
            ? 'Loading...'
            : `${market.marketType.toUpperCase()} - ${market.title}`
        }
      />
      <section
        id="main"
        className="container-fluid"
        aria-label="main body of content plus related links and features"
      >
        <div className="container">
          <Alert />
          <MarketItemDetails market={market} />
        </div>
      </section>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarketItemViewPage);
