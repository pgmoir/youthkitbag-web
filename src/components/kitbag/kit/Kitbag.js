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
  kitbags: state.user.kitbags,
  lists: state.kitbag.kit.lists,
});

const mapDispatchToProps = {
  fetchKitbagKits,
};

const Kitbag = ({
  stateSearch,
  items,
  pagination,
  kitbags,
  lists,
  fetchKitbagKits,
  match,
}) => {
  const [search, setSearch] = useState(stateSearch);
  const [kitbagId] = useState(match.params.kitbagId);
  const [kits, setKits] = useState(items);

  useEffect(() => {
    if (items) {
      setKits(items);
    }
  }, [items]);

  useEffect(() => {
    fetchKitbagKits({
      ...search,
      kitbagId,
      pushHistory: true,
    });
  }, [search, fetchKitbagKits, kitbagId]);

  function getTitle() {
    if (!kitbags) {
      return 'Loading ...';
    }
    const kitbag = kitbags.find((a) => a.preferred);
    return `${kitbag.name} (${pagination.totalItems})`;
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
        <KitCard key={`${item._id}-${index}`} kit={item} kitbagId={kitbagId} />
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
                searchId={kitbagId}
                search={search}
                callback={setSearch}
                collections={lists}
              />
            </div>
            <div className="col-12 col-sm-3 mb-3 d-flex justify-content-end">
              <Link
                to={`/kitbag/kit/${kitbagId}/new`}
                className="btn btn-primary"
              >
                Add new kit
              </Link>
            </div>
          </div>
          <div className="row">{renderList()}</div>
          <Pagination
            kitbagId={kitbagId}
            search={search}
            callback={setSearch}
          />
        </div>
      </section>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Kitbag);
