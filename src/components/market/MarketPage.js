import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';

import { fetchMarketItems } from '../../actions/MarketActions';
import Alert from '../includes/Alert';
import Breadcrumb from '../includes/Breadcrumb';
import MarketItemCard from './MarketItemCard';
import Pagination from '../includes/Pagination';
import SearchForm from '../includes/SearchForm';
import Title from '../includes/title/Title';
import { useParams } from 'react-router-dom';

const mapStateToProps = (state) => ({
  stateSearch: state.market.search,
  entities: state.market.entities,
  pagination: state.pagination,
  lists: state.market.lists
});

const mapDispatchToProps = {
  fetchMarketItems
};

const MarketPage = ({
  stateSearch,
  entities,
  pagination,
  lists,
  fetchMarketItems
}) => {
  const { kitbagId } = useParams();
  const [search, setSearch] = useState(stateSearch);
  const [displayRow, setDisplayRow] = useState(false);

  useEffect(() => {
    fetchMarketItems({ ...search });
  }, [search, fetchMarketItems]);

  function getTitle() {
    return `Market (${pagination.totalItems})`;
  }

  const crumbs = [{ title: 'Home', to: '/' }, { title: 'Market' }];

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

  function renderCards(isCard) {
    return Object.keys(entities).map((key) => {
      return (
        <MarketItemCard
          key={key}
          market={entities[key]}
          callback={setSearch}
          isCard={isCard}
        />
      );
    });
  }

  function updateDisplay() {
    setDisplayRow(!displayRow);
  }

  return (
    <div className="main container is-fluid">
      <Breadcrumb crumbs={crumbs} />
      <Title
        title={getTitle()}
        icon={displayRow ? 'fas fa-address-card' : 'fas fa-align-justify'}
        iconAction={updateDisplay}
        hasAction={true}
      />
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
      {displayRow ? (
        <div className="">{renderCards(false)}</div>
      ) : (
        <div className="columns is-multiline is-mobile is-tablet is-desktop is-fullhd">
          {renderCards(true)}
        </div>
      )}
      <div className="mb-3">
        <Pagination kitbagId={kitbagId} search={search} callback={setSearch} />
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketPage);
