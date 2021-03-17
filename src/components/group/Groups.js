import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { fetchGroups } from '../../actions';
import Title from '../includes/title/Title';
import GroupCard from './GroupCard';
import SearchForm from '../includes/SearchForm';
import Pagination from '../includes/Pagination';
import Alert from '../includes/Alert';
import Breadcrumb from '../includes/Breadcrumb';

const mapStateToProps = (state) => ({
  stateSearch: state.group.search,
  items: Object.values(state.group.entities),
  pagination: state.pagination,
  userBundle: state.user.bundle,
  lists: state.group.lists,
});

const mapDispatchToProps = {
  fetchGroups,
};

const Groups = ({
  stateSearch,
  items,
  pagination,
  lists,
  userBundle,
  fetchGroups,
}) => {
  const [search, setSearch] = useState(stateSearch);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (items) {
      setGroups(items);
    }
  }, [items]);

  useEffect(() => {
    fetchGroups({ ...search });
  }, [search, fetchGroups]);

  function getTitle() {
    return `Found groups (${pagination.totalItems})`;
  }

  function renderBlankList() {
    const blankList = [{}, {}, {}, {}, {}, {}];
    return blankList.map((item, index) => {
      return <GroupCard key={`${index}`} group={item} />;
    });
  }

  if (!groups) {
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
    return groups.map((item, index) => {
      return <GroupCard key={`${index}`} group={item} callback={setSearch} />;
    });
  }

  function renderAddNewButton() {
    if (
      !userBundle ||
      userBundle.max.groupAdmins <= userBundle.size.groupAdmins
    )
      return null;

    return (
      <div className="is-sticky-bottomright icon-text">
        <Link
          to="/groups/new"
          className="icon is-extralarge has-background-success has-text-light is-rounded m-5"
          title="Add new group"
        >
          <i className="fas fa-plus"></i>
        </Link>
      </div>
    );
  }

  const crumbs = [{ title: 'Home', to: '/' }, { title: 'Groups' }];

  return (
    <>
      <div className="main container is-fluid">
        <Breadcrumb crumbs={crumbs} />
        <Title title={getTitle()} />
        <Alert />
        <div className="columns">
          <div className="column is-three-quarters">
            <SearchForm
              search={search}
              callback={setSearch}
              collections={lists}
              placeholderText="Search groups"
            />
          </div>
          <div className="column is-one-quarter has-text-right">
            {renderAddNewButton()}
          </div>
        </div>
        <div className="columns is-multiline is-mobile is-tablet is-desktop is-fullhd">
          {renderList()}
        </div>
        <div className="mb-3">
          <Pagination search={search} callback={setSearch} />
        </div>
      </div>
      {renderAddNewButton()}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
