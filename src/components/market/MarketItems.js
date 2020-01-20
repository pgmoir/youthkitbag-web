import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMarketItems } from '../../actions/MarketActions';
import queryString from 'query-string';
import Title from '../includes/title/Title';
import MarketItemCard from './MarketItemCard';
import SearchForm from '../includes/SearchForm';
import Pagination from '../includes/Pagination';

const mapStateToProps = state => ({
  items: Object.values(state.market.list),
  filter: state.filter,
  pagination: state.pagination,
  accounts: state.user.profile.accounts
});

const mapDispatchToProps = {
  fetchMarketItems
};

const MarketItems = ({ items, pagination, fetchMarketItems, match }) => {
  console.log('=========================================================');
  let { search } = useLocation();
  if (!search) {
    search = '?searchfor=&by=all&page=1&pagesize=24';
  }
  console.log('SEARCH', search);

  const [{ searchfor, by, page, pagesize }] = useState(
    queryString.parse(search)
  );

  const accountId = match.params.accountId;
  const [marketItems, setMarketItems] = useState([]);

  useEffect(() => {
    if (items) {
      setMarketItems(items);
    }
  }, [items]);

  useEffect(() => {
    console.log('FETCHMARKETBAGS');
    fetchMarketItems(searchfor, by, page, pagesize);
  }, [searchfor, by, page, pagesize, fetchMarketItems]);

  function getTitle() {
    return `Market place items (${pagination.totalItems})`;
  }

  function renderBlankPage() {
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

  function renderBlankList() {
    const blankList = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    return blankList.map((item, index) => {
      return <MarketItemCard key={`${item._id}-${index}`} market={item} />;
    });
  }

  function renderList() {
    if (!marketItems) return renderBlankList();

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

  function renderPopulatedPage() {
    return (
      <div>
        <Title title={getTitle()} />
        <section
          id="main"
          className="container-fluid"
          aria-label="main body of content plus related links and features"
        >
          <div className="container">
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
            <Pagination />
          </div>
        </section>
      </div>
    );
  }

  return (
    <React.Fragment>
      {marketItems && renderPopulatedPage()}
      {!marketItems && renderBlankPage()}
    </React.Fragment>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarketItems);
