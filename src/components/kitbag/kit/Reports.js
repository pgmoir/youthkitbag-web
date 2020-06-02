import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { fetchReports } from '../../actions';
import Alert from '../includes/Alert';
import Title from '../includes/title/Title';
import ReportCard from './ReportCard';
import ReportRow from './ReportRow';
import SearchForm from '../includes/SearchForm';
import Pagination from '../includes/Pagination';
import { SWITCH_VIEW } from '../../actions/types';

const mapStateToProps = (state) => ({
  stateSearch: state.reports.search,
  items: Object.values(state.reports.list),
  pagination: state.pagination,
  style: state.reports.style,
});

const mapDispatchToProps = {
  fetchReports,
};

const Reports = ({ stateSearch, items, pagination, style, fetchReports }) => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState(stateSearch);
  const [reports, setReports] = useState(items);

  useEffect(() => {
    if (items) {
      setReports(items);
    }
  }, [items]);

  useEffect(() => {
    fetchReports({
      ...search,
      pushHistory: true,
    });
  }, [search, fetchReports]);

  function changeOrder(field) {
    if (field !== search.order) {
      setSearch({ ...search, order: field, direction: -1, loading: false });
    } else {
      setSearch({ ...search, direction: -search.direction, loading: false });
    }
  }

  function renderBlankList() {
    const blankList = [{}, {}, {}, {}];
    return blankList.map((item, index) => {
      return <ReportCard key={`${item._id}-${index}`} report={item} />;
    });
  }

  if (!reports) {
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

  function getSortIcon(field) {
    if (field !== search.order) {
      return 'fa-sort';
    }
    return search.direction === 1 ? 'fa-sort-up' : 'fa-sort-down';
  }

  function renderList() {
    if (style === 'cards') {
      return reports.map((item, index) => {
        return <ReportCard key={`${item._id}-${index}`} report={item} />;
      });
    } else {
      return (
        <div className="col-12">
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th className="text-nowrap">
                  <button
                    className="btn btn-link text-white font-weight-bold p-0 border-0"
                    onClick={() => changeOrder('asset')}
                  >
                    Asset
                    <span className={`fas ${getSortIcon('asset')} ml-3`}></span>
                  </button>
                </th>
                <th>Client</th>
                <th>Type</th>
                <th>Status</th>
                <th className="text-nowrap">
                  <button
                    className="btn btn-link text-white font-weight-bold p-0 border-0"
                    onClick={() => changeOrder('createdAt')}
                  >
                    Created
                    <span
                      className={`fas ${getSortIcon('createdAt')} ml-3`}
                    ></span>
                  </button>
                </th>
                <th className="text-nowrap">
                  <button
                    className="btn btn-link text-white font-weight-bold p-0 border-0"
                    onClick={() => changeOrder('updatedAt')}
                  >
                    Updated
                    <span
                      className={`fas ${getSortIcon('updatedAt')} ml-3`}
                    ></span>
                  </button>
                </th>
                <th>Photo</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((item, index) => {
                return (
                  <ReportRow
                    key={`${item._id}-${index}`}
                    report={item}
                    incDelete={true}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
  }

  function toggleView(style) {
    dispatch({ type: SWITCH_VIEW, payload: style });
  }

  return (
    <div>
      <Title title={`Reports (${pagination.totalItems})`} />
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
                search={search}
                callback={setSearch}
                placeholderText="Search for a number"
              />
            </div>
            <div className="col-12 col-sm-3 mb-3 d-flex justify-content-end">
              {style === 'cards' && (
                <button
                  className="btn btn-success mr-2"
                  onClick={() => toggleView('table')}
                >
                  <span
                    className="fas fa-table"
                    title="View as table"
                    aria-hidden="true"
                  ></span>{' '}
                </button>
              )}
              {style === 'table' && (
                <button
                  className="btn btn-success mr-2"
                  onClick={() => toggleView('cards')}
                >
                  <span
                    className="fas fa-file-contract"
                    title="View as cards"
                    aria-hidden="true"
                  ></span>{' '}
                </button>
              )}
              <Link to="/reports/new" className="btn btn-primary">
                <span
                  className="fas fa-plus"
                  title="Add new report"
                  aria-hidden="true"
                ></span>{' '}
              </Link>
            </div>
          </div>
          <div className="row">{renderList()}</div>
          <Pagination search={search} callback={setSearch} />
        </div>
      </section>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
