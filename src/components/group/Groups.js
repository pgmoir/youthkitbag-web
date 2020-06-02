import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchGroups } from '../../actions';
import Title from '../includes/title/Title';
import GroupCard from './GroupCard';
import SearchForm from '../includes/SearchForm';
import Pagination from '../includes/Pagination';
import Alert from '../includes/Alert';
import GroupsHelp from '../account/GroupsHelp';

const mapStateToProps = (state) => ({
  stateSearch: state.group.search,
  items: Object.values(state.group.list),
  pagination: state.pagination,
  userPackage: state.user.package,
});

const mapDispatchToProps = {
  fetchGroups,
};

const Groups = ({
  stateSearch,
  items,
  pagination,
  userPackage,
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
      !userPackage ||
      userPackage.max.groupadmins <= userPackage.size.groupadmins
    )
      return null;

    return (
      <div className="col-12 col-sm-3 mb-3 d-flex justify-content-end">
        <Link to="/groups/new" className="btn btn-primary">
          Add new group
        </Link>
      </div>
    );
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
          <GroupsHelp />
          <Alert />
          <div className="row">
            <div className="col-12 col-sm-9">
              <SearchForm search={search} callback={setSearch} />
            </div>
            {renderAddNewButton()}
          </div>
          <div className="row">{renderList()}</div>
          <Pagination search={search} callback={setSearch} />
        </div>
      </section>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
