import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMarketItems } from '../../actions/MarketActions';
import queryString from 'query-string';
import Title from '../includes/title/Title';
import MarketItemCard from './MarketItemCard';
import SearchForm from '../includes/SearchForm';
import Pagination from '../includes/Pagination';
import { useLocation } from 'react-router-dom';

const mapStateToProps = state => {
  return {
    items: Object.values(state.market.list),
    filter: state.filter,
    pagination: state.pagination,
    accounts: state.user.profile.accounts
  };
};

const mapDispatchToProps = {
  fetchMarketItems
};

const MarketItems = ({ items, pagination, fetchMarketItems, match }) => {
  const { search } = useLocation();
  const accountId = match.params.accountId;
  const [marketItems, setMarketItems] = useState([]);

  useEffect(() => {
    if (items) {
      setMarketItems(items);
    }
  }, [items]);

  useEffect(() => {
    if (search) {
      const qsvalues = queryString.parse(search);
      const searchValue = qsvalues.search ? qsvalues.search : '';
      const byValue = qsvalues.by ? qsvalues.by : '';
      const pageValue = qsvalues.page ? qsvalues.page : 1;
      const pagesizeValue = qsvalues.pagesize ? qsvalues.pagesize : 24;
      fetchMarketItems(searchValue, byValue, pageValue, pagesizeValue);
    } else {
      fetchMarketItems();
    }
  }, [search, fetchMarketItems]);

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
