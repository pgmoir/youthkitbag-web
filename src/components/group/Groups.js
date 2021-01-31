import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchGroups } from '../../actions';
import Title from '../includes/title/Title';
import GroupCard from './GroupCard';
import SearchForm from '../includes/SearchForm';
import Pagination from '../includes/Pagination';
import Alert from '../includes/Alert';
import GroupsHelp from '../kitbag/GroupsHelp';

const mapStateToProps = (state) => ({
  stateSearch: state.group.search,
  items: Object.values(state.group.list),
  pagination: state.pagination,
  userBundle: state.user.bundle,
});

const mapDispatchToProps = {
  fetchGroups,
};

const Groups = ({
  stateSearch,
  items,
  pagination,
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
    fetchGroups({ ...search, pushHistory: true });
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
      return <GroupCard key={`${index}`} group={item} />;
    });
  }

  function renderAddNewButton() {
    if (
      !userBundle ||
      userBundle.max.groupAdmins <= userBundle.size.groupAdmins
    )
      return null;

    return (
      <Link to="/groups/new" className="button is-primary">
        Add new group
      </Link>
    );
  }

  return (
    <div className="container is-fluid px-0">
      <Title title={getTitle()} />
      <Alert />
      <div className="columns">
        <div className="column is-three-quarters">
          <SearchForm
            search={search}
            callback={setSearch}
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
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
