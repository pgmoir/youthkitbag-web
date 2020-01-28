import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchKitbagKits } from '../../../actions';
import Alert from '../../includes/Alert';
import Title from '../../includes/title/Title';
import KitCard from './KitCard';
import SearchForm from '../../includes/SearchForm';
import Pagination from '../../includes/Pagination';

const mapStateToProps = state => ({
  search: state.kitbag.kit.search,
  items: Object.values(state.kitbag.kit.list),
  pagination: state.pagination,
  accounts: state.user.profile.accounts
});

const mapDispatchToProps = {
  fetchKitbagKits
};

const KitBag = ({
  search,
  items,
  pagination,
  accounts,
  fetchKitbagKits,
  match
}) => {
  console.log('=========================================================');
  console.log('SEARCH', search);

  const { searchfor, by, page, pagesize } = search;

  const [accountId] = useState(match.params.accountId);
  const [kits, setKits] = useState([]);

  useEffect(() => {
    if (items) {
      setKits(items);
    }
  }, [items]);

  useEffect(() => {
    console.log('FETCHKITBAGS');
    fetchKitbagKits(searchfor, by, page, pagesize, accountId);
  }, [searchfor, by, page, pagesize, fetchKitbagKits, accountId]);

  function getTitle() {
    if (!accounts) {
      return 'Loading ...';
    }
    const account = accounts.find(a => a.preferred);
    return `${account.name} (${pagination.totalItems})`;
  }

  function renderBlank() {
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
      return <KitCard key={`${item._id}-${index}`} kit={item} />;
    });
  }

  function renderList() {
    if (!kits) return renderBlankList();

    return kits.map((item, index) => {
      return (
        <KitCard
          key={`${item._id}-${index}`}
          kit={item}
          accountId={accountId}
        />
      );
    });
  }

  function renderPage() {
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
                  callback={fetchKitbagKits}
                />
              </div>
              <div className="col-12 col-sm-3 mb-3 d-flex justify-content-end">
                <Link
                  to={`/kitbag/kit/${accountId}/new`}
                  className="btn btn-primary"
                >
                  Add new kit
                </Link>
              </div>
            </div>
            <div className="row">{renderList()}</div>
            <Pagination
              accountId={accountId}
              search={search}
              callback={fetchKitbagKits}
            />
          </div>
        </section>
      </div>
    );
  }

  return (
    <React.Fragment>
      {kits && renderPage()}
      {!kits && renderBlank()}
    </React.Fragment>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(KitBag);
