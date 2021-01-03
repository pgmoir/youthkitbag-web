import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  pagination: state.pagination,
});

const Pagination = ({ kitbagId, search, callback, pagination }) => {
  const {
    searchfor,
    by,
    pagesize,
    order,
    direction,
    excgroups,
    exckitbags,
  } = search;

  function changePage(moveToPage) {
    callback({
      by,
      searchfor,
      page: moveToPage,
      pagesize,
      order,
      direction,
      kitbagId,
      excgroups,
      exckitbags,
    });
  }

  function isFirstPageDisabled() {
    return pagination.currentPage === 1 ? 'disabled' : '';
  }

  function isPreviousPageDisabled() {
    return !pagination.hasPreviousPage ? 'disabled' : '';
  }

  function isNextPageDisabled() {
    return !pagination.hasNextPage ? 'disabled' : '';
  }

  function isLastPageDisabled() {
    return pagination.lastPage === pagination.currentPage ? 'disabled' : '';
  }

  return (
    <React.Fragment>
      {pagination && pagination.totalItems > pagination.itemsPerPage && (
        <nav aria-label="Page navigation">
          <ul className="pagination">
            <li className={`page-item ${isFirstPageDisabled()}`}>
              <button className="page-link" onClick={() => changePage(1)}>
                First
              </button>
            </li>
            <li className={`page-item ${isPreviousPageDisabled()}`}>
              <button
                className="page-link"
                onClick={() => changePage(pagination.previousPage)}
              >
                Previous
              </button>
            </li>
            <li className="page-item active">
              <button
                className="page-link"
                onClick={() => changePage(pagination.currentPage)}
              >
                {pagination.currentPage}
              </button>
            </li>
            <li className={`page-item ${isNextPageDisabled()}`}>
              <button
                className="page-link"
                onClick={() => changePage(pagination.nextPage)}
              >
                Next
              </button>
            </li>
            <li className={`page-item ${isLastPageDisabled()}`}>
              <button
                className="page-link"
                onClick={() => changePage(pagination.lastPage)}
              >
                Last
              </button>
            </li>
          </ul>
        </nav>
      )}
    </React.Fragment>
  );
};

export default connect(mapStateToProps)(Pagination);
