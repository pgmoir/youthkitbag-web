import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMarketItems } from '../../actions/MarketActions';
import Title from '../includes/title/Title';
import MarketItemCard from './MarketItemCard';
import SearchForm from '../includes/SearchForm';
import Pagination from '../includes/Pagination';
import Alert from '../includes/Alert';

const mapStateToProps = (state) => ({
  stateSearch: state.market.search,
  items: Object.values(state.market.list),
  pagination: state.pagination,
});

const mapDispatchToProps = {
  fetchMarketItems,
};

const MarketItems = ({
  stateSearch,
  items,
  pagination,
  fetchMarketItems,
  match,
}) => {
  const [search, setSearch] = useState(stateSearch);
  const accountId = match.params.accountId;
  const [marketItems, setMarketItems] = useState([]);

  useEffect(() => {
    if (items) {
      setMarketItems(items);
    }
  }, [items]);

  useEffect(() => {
    fetchMarketItems({ ...search, pushHistory: true });
  }, [search, fetchMarketItems]);

  function getTitle() {
    return `Market place items (${pagination.totalItems})`;
  }

  function renderBlankList() {
    const blankList = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    return blankList.map((item, index) => {
      return <MarketItemCard key={`${item._id}-${index}`} market={item} />;
    });
  }

  if (!marketItems) {
    return (
      <div>
        <Title title="Loading ...." />
        <section
          id="main"
          className="container-fluid"
          aria-label="main body of content plus related links and features"
        >
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-9">
                <div className="bg-light hgt-3 mb-3">&nbsp;</div>
              </div>
            </div>
            <div className="row">{renderBlankList()}</div>
          </div>
        </section>
      </div>
    );
  }

  function renderList() {
    return marketItems.map((item, index) => {
      return (
        <MarketItemCard
          key={`${item._id}-${index}`}
          market={item}
          accountId={accountId}
        />
      );
    });
  }

  return (
    <div>
      <Title title={getTitle()} />
      <section
        id="main"
        className="container-fluid"
        aria-label="main body of content plus related links and features"
      >
        <div className="container">
          <Alert />
          <div className="row">
            <div className="col-12 col-sm-9">
              <SearchForm
                searchId={accountId}
                search={search}
                callback={setSearch}
              />
            </div>
          </div>
          <div className="row">{renderList()}</div>
          <Pagination
            accountId={accountId}
            search={search}
            callback={setSearch}
          />
        </div>
      </section>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketItems);
