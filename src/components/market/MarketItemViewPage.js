import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { fetchMarketItem } from '../../actions/MarketActions';
import MarketItemForm from './MarketItemForm';
import MarketTitle from '../includes/title/MarketTitle';
import Title from '../includes/title/Title';
import Alert from '../includes/Alert';

const mapDispatchToProps = {
  fetchMarketItem,
};

const MarketItemViewPage = ({ fetchMarketItem, match }) => {
  const { marketId } = match.params;

  const market = useSelector((state) => {
    return !marketId ? null : state.market.entities[marketId];
  });

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
    <div className="container">
      {getTitle()}
      <Alert />
      {market && market._id && <MarketItemForm market={market} />}
    </div>
  );
};

export default connect(null, mapDispatchToProps)(MarketItemViewPage);
