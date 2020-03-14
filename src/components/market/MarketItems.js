import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMarketItems } from '../../actions/MarketActions';
import Title from '../includes/title/Title';
import MarketItemCard from './MarketItemCard';
import SearchForm from '../includes/SearchForm';
import Pagination from '../includes/Pagination';
import Alert from '../includes/Alert';
import queryString from 'query-string';

const mapStateToProps = state => ({
  search: state.market.search,
  items: Object.values(state.market.list),
  pagination: state.pagination
});

const mapDispatchToProps = {
  fetchMarketItems
};

const MarketItems = ({
  search,
  items,
  pagination,
  fetchMarketItems,
  match
}) => {
  const query = useLocation().search;
  let {
    searchfor,
    by,
    page,
    pagesize,
    excgroups,
    excaccounts,
    loading
  } = search;
  if (query || loading) {
    const searchQuery = queryString.parse(query);
    searchfor = searchQuery.searchfor;
    by = searchQuery.by;
    page = +searchQuery.page;
    pagesize = +searchQuery.pagesize;
    excgroups = searchQuery.excgroups === 'true';
    excaccounts = searchQuery.excaccounts === 'true';
    search = { searchfor, by, page, pagesize };
  }

  const accountId = match.params.accountId;
  const [marketItems, setMarketItems] = useState([]);

  useEffect(() => {
    if (items) {
      setMarketItems(items);
    }
  }, [items]);

  useEffect(() => {
    fetchMarketItems(searchfor, by, page, pagesize, excgroups, excaccounts);
  }, [searchfor, by, page, pagesize, excgroups, excaccounts, fetchMarketItems]);

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
                accountId={accountId}
                search={search}
                callback={fetchMarketItems}
              />
            </div>
          </div>
          <div className="row">{renderList()}</div>
          <Pagination
            accountId={accountId}
            search={search}
            callback={fetchMarketItems}
          />
        </div>
      </section>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketItems);
