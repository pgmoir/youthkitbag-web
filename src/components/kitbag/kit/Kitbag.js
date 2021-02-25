import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchKitbagKits } from '../../../actions';
import Alert from '../../includes/Alert';
import Title from '../../includes/title/Title';
import KitCard from './KitCard';
import SearchForm from '../../includes/SearchForm';
import Pagination from '../../includes/Pagination';
import Breadcrumb from '../../includes/Breadcrumb';

const mapStateToProps = (state) => ({
  stateSearch: state.kitbag.kit.search,
  entities: state.kitbag.kit.entities,
  pagination: state.pagination,
  kitbags: state.user.kitbags,
  lists: state.kitbag.kit.lists,
});

const mapDispatchToProps = {
  fetchKitbagKits,
};

const Kitbag = ({
  stateSearch,
  entities,
  pagination,
  kitbags,
  lists,
  fetchKitbagKits,
  match,
}) => {
  const [search, setSearch] = useState(stateSearch);
  const [kitbagId] = useState(match.params.kitbagId);

  useEffect(() => {
    fetchKitbagKits({
      ...search,
      kitbagId,
    });
  }, [search, fetchKitbagKits, kitbagId]);

  function getTitle(includeCount = true) {
    if (!kitbags) {
      return 'Loading ...';
    }
    const kitbag = kitbags.find((a) => a.preferred);

    if (includeCount) {
      return `${kitbag.name} (${pagination.totalItems})`;
    }

    return `${kitbag.name}`;
  }

  const crumbs = [{ title: 'Home', to: '/' }, { title: getTitle(false) }];

  function renderBlankList() {
    const blankList = [{}, {}, {}, {}, {}, {}];
    return blankList.map((item, index) => {
      return <KitCard key={`${index}`} kit={item} />;
    });
  }

  if (!Object.keys(entities)) {
    return (
      <div className="container is-fluid px-0">
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
        <KitCard key={`${index}`} kit={entities[key]} kitbagId={kitbagId} />
      );
    });
  }

  return (
    <>
      <div>
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
              placeholderText="Search your kit"
            />
          </div>
          <div className="column is-one-quarter has-text-right">
            <Link
              to={`/kitbag/kit/${kitbagId}/new`}
              className="button is-primary"
            >
              Add new kit
            </Link>
          </div>
        </div>
        <div className="columns is-multiline is-mobile is-tablet is-desktop is-fullhd">
          {renderList()}
        </div>
        <div className="mb-3">
          <Pagination
            kitbagId={kitbagId}
            search={search}
            callback={setSearch}
          />
        </div>
      </div>
      <div className="is-sticky-bottomright">
        <div className="tag is-large is-rounded is-success m-5">
          <i className="fas fa-plus"></i>
        </div>
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Kitbag);
