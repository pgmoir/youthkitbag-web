import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { fetchMarketItem } from '../../actions/MarketActions';
import MarketItemForm from './MarketItemForm';
import MarketTitle from '../includes/title/MarketTitle';
import Title from '../includes/title/Title';
import Alert from '../includes/Alert';
import Breadcrumb from '../includes/Breadcrumb';
import { useParams } from 'react-router-dom';

const mapDispatchToProps = {
  fetchMarketItem
};

const MarketItemViewPage = ({ fetchMarketItem }) => {
  const { marketId } = useParams;

  const market = useSelector((state) => {
    return !marketId ? null : state.market.entities[marketId];
  });

  const crumbs = [
    { title: 'Home', to: '/' },
    { title: 'Market', to: '/market' },
    { title: `${market?.title}` }
  ];

  useEffect(() => {
    fetchMarketItem(marketId);
  }, [fetchMarketItem, marketId]);

  function getTitle() {
    if (!market) {
      return <Title title="Loading ..." />;
    }

    return <MarketTitle market={market} isOwned={false} />;
  }

  return (
    <div className="main container is-fluid">
      <Breadcrumb crumbs={crumbs} />
      {getTitle()}
      <div className="container">
        <Alert />
        {market && market._id && <MarketItemForm market={market} />}
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(MarketItemViewPage);
