import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';

import { fetchMarketItems } from '../../actions/MarketActions';
import Alert from '../includes/Alert';
import Breadcrumb from '../includes/Breadcrumb';
import MarketItemCard from './MarketItemCard';
import Pagination from '../includes/Pagination';
import SearchForm from '../includes/SearchForm';
import Title from '../includes/title/Title';

const mapStateToProps = (state) => ({
  stateSearch: state.market.search,
  entities: state.market.entities,
  pagination: state.pagination,
  lists: state.kitbag.kit.lists,
});

const mapDispatchToProps = {
  fetchMarketItems,
};

const MarketPage = ({
  stateSearch,
  entities,
  pagination,
  lists,
  fetchMarketItems,
  match,
}) => {
  const [search, setSearch] = useState(stateSearch);
  const kitbagId = match.params.kitbagId;

  useEffect(() => {
    fetchMarketItems({ ...search });
  }, [search, fetchMarketItems]);

  const crumbs = [{ title: 'Home', to: '/' }, { title: 'Market' }];

  function getTitle() {
    return `Market (${pagination.totalItems})`;
  }

  function renderBlankList() {
    const blankList = [{}, {}, {}, {}, {}, {}];
    return blankList.map((item, index) => {
      return <MarketItemCard key={`${index}`} market={item} />;
    });
  }

  if (!Object.keys(entities)) {
    return (
      <div className="main container is-fluid">
        <Breadcrumb crumbs={crumbs} />
        <Title title="Loading ...." />
        <div className="columns is-multiline is-mobile is-tablet is-desktop is-fullhd">
          {renderBlankList()}
        </div>
      </div>
    );
  }

  function renderList() {
    return Object.keys(entities).map((key, index) => {
      return (
        <MarketItemCard
          key={`${index}`}
          market={entities[key]}
          kitbagId={kitbagId}
        />
      );
    });
  }

  return (
    <div className="main container is-fluid">
      <Breadcrumb crumbs={crumbs} />
      <Title title={getTitle()} />
      <Alert />
      <div className="columns">
        <div className="column is-three-quarters">
          <SearchForm
            searchId={kitbagId}
            search={search}
            callback={setSearch}
            collections={lists}
            placeholderText="Search the market"
          />
        </div>
      </div>
      <div className="columns is-multiline is-mobile is-tablet is-desktop is-fullhd">
        {renderList()}
      </div>
      <div className="mb-3">
        <Pagination kitbagId={kitbagId} search={search} callback={setSearch} />
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketPage);
