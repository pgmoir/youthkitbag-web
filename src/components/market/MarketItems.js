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
  entities: state.market.entities,
  pagination: state.pagination,
  lists: state.kitbag.kit.lists,
});

const mapDispatchToProps = {
  fetchMarketItems,
};

const MarketItems = ({
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
    <div className="container is-fluid px-0">
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

export default connect(mapStateToProps, mapDispatchToProps)(MarketItems);
