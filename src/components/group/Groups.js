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
    const blankList = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    return blankList.map((item, index) => {
      return <GroupCard key={`${item._id}-${index}`} group={item} />;
    });
  }

  if (!groups) {
    return (
      <div>
        <Title title="Loading ...." />
        <section
          id="main"
          className="container-fluid"
          aria-label="main body of content plus related links and features"
        >
          <div className="container">
            <GroupsHelp />
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
    return groups.map((item, index) => {
      return <GroupCard key={`${item._id}-${index}`} group={item} />;
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
    <div className="container is-fluid">
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
