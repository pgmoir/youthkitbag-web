import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchKitbagKits } from '../../../actions';
import Alert from '../../includes/Alert';
import Title from '../../includes/title/Title';
import KitCard from './KitCard';
import SearchForm from '../../includes/SearchForm';
import Pagination from '../../includes/Pagination';

const mapStateToProps = (state) => ({
  stateSearch: state.kitbag.kit.search,
  items: state.kitbag.kit.list,
  pagination: state.pagination,
  accounts: state.user.profile.accounts,
  containers: state.kitbag.kit.lists.containers,
});

const mapDispatchToProps = {
  fetchKitbagKits,
};

const KitBag = ({
  stateSearch,
  items,
  pagination,
  accounts,
  containers,
  fetchKitbagKits,
  match,
}) => {
  const [search, setSearch] = useState(stateSearch);
  const [accountId] = useState(match.params.accountId);
  const [kits, setKits] = useState(items);

  useEffect(() => {
    if (items) {
      setKits(items);
    }
  }, [items]);

  useEffect(() => {
    fetchKitbagKits({
      ...search,
      accountId,
      pushHistory: true,
    });
  }, [search, fetchKitbagKits, accountId]);

  function getTitle() {
    if (!accounts) {
      return 'Loading ...';
    }
    const account = accounts.find((a) => a.preferred);
    return `${account.name} (${pagination.totalItems})`;
  }

  function renderBlankList() {
    const blankList = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    return blankList.map((item, index) => {
      return <KitCard key={`${item._id}-${index}`} kit={item} />;
    });
  }

  if (!kits) {
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
                containers={containers}
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
            callback={setSearch}
          />
        </div>
      </section>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(KitBag);
