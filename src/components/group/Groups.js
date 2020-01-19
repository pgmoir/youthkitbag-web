import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchGroups } from '../../actions';
import queryString from 'query-string';
import Title from '../includes/title/Title';
import GroupCard from './GroupCard';
import SearchForm from '../includes/SearchForm';
import Pagination from '../includes/Pagination';
import Alert from '../includes/Alert';

const mapStateToProps = state => ({
  items: Object.values(state.group.list),
  filter: state.filter,
  pagination: state.pagination,
  userPackage: state.user.package
});

const mapDispatchToProps = {
  fetchGroups
};

const Groups = ({ items, pagination, userPackage, fetchGroups }) => {
  const { search } = useLocation();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (items) {
      setGroups(items);
    }
  }, [items]);

  useEffect(() => {
    if (search) {
      const qsvalues = queryString.parse(search);
      const searchValue = qsvalues.search ? qsvalues.search : '';
      const byValue = qsvalues.by ? qsvalues.by : '';
      const pageValue = qsvalues.page ? qsvalues.page : 1;
      const pagesizeValue = qsvalues.pagesize ? qsvalues.pagesize : 24;
      fetchGroups(searchValue, byValue, pageValue, pagesizeValue);
    } else {
      fetchGroups();
    }
  }, [search, fetchGroups]);

  function getTitle() {
    return `Found groups (${pagination.totalItems})`;
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
      return <GroupCard key={`${item._id}-${index}`} group={item} />;
    });
  }

  function renderList() {
    if (!groups) return renderBlankList();

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
                <SearchForm search={search} callback={fetchGroups} />
              </div>
              {renderAddNewButton()}
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
      {groups && renderPage()}
      {!groups && renderBlank()}
    </React.Fragment>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Groups);
