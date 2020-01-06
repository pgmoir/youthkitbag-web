import React from 'react';
import { connect } from 'react-redux';
import { fetchMarketItems } from '../../actions/MarketActions';
import queryString from 'query-string';
import Title from '../includes/title/Title';
import MarketItemCard from './MarketItemCard';
import SearchForm from '../includes/SearchForm';
import Pagination from '../includes/Pagination';

class MarketItems extends React.Component {
  getTitle() {
    return `Market place items (${this.props.pagination.totalItems})`;
  }

  componentDidMount() {
    var by = '';
    var search = '';
    var page = '';

    const accountId = this.props.match.params.accountId;
    console.log('MARK', accountId);

    if (this.props.location.search) {
      const values = queryString.parse(this.props.location.search);
      search = values.search ? values.search : '';
      by = values.by ? values.by : '';
      page = values.page ? values.page : '';
    }

    this.props.fetchMarketItems(accountId, search, by, page, 24);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      const accountId = this.props.match.params.accountId;
      const values = queryString.parse(this.props.location.search);
      const search = values.search ? values.search : '';
      const by = values.by ? values.by : '';
      const page = values.page ? values.page : '';
      this.props.fetchMarketItems(accountId, search, by, page, 24);
    }
  }

  renderBlank() {
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
            <div className="row">{this.renderBlankList()}</div>
          </div>
        </section>
      </div>
    );
  }

  renderBlankList() {
    const blankList = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    return blankList.map((item, index) => {
      return <MarketItemCard key={`${item._id}-${index}`} market={item} />;
    });
  }

  renderList() {
    if (!this.props.items) return this.renderBlankList();

    let items = [...this.props.items];

    if (items.length < 12) {
      for (var i = items.length; i < 12; i++) {
        items.push({});
      }
    }

    return items.map((item, index) => {
      const accountId = this.props.match.params.accountId;
      return (
        <MarketItemCard
          key={`${item._id}-${index}`}
          market={item}
          accountId={accountId}
        />
      );
    });
  }

  render() {
    if (!this.props.items) return this.renderBlank();

    const accountId = this.props.match.params.accountId;

    return (
      <div>
        <Title title={this.getTitle()} />
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
                  search={this.props.location.search}
                  callback={fetchMarketItems}
                />
              </div>
            </div>
            <div className="row">{this.renderList()}</div>
            <Pagination />
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: Object.values(state.market.list),
    filter: state.filter,
    pagination: state.pagination
  };
};

export default connect(
  mapStateToProps,
  { fetchMarketItems }
)(MarketItems);
