import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMarketItem } from '../../actions/MarketActions';
import MarketItemDetails from './MarketItemDetails';
import MarketTitle from '../includes/title/MarketTitle';
import Title from '../includes/title/Title';
import Alert from '../includes/Alert';

const mapStateToProps = (state) => ({
  market: state.market.current,
});

const mapDispatchToProps = {
  fetchMarketItem,
};

const MarketItemViewPage = ({ market, fetchMarketItem, match }) => {
  const marketId = match.params.marketId;

  useEffect(() => {
    fetchMarketItem(marketId);
  }, [fetchMarketItem, marketId]);

  function getTitle() {
    if (!market) {
      return <Title title="Loading ..." />;
    }

    return <MarketTitle market={market} />;
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
          {market && market._id && <MarketItemDetails market={market} />}
        </div>
      </section>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketItemViewPage);
