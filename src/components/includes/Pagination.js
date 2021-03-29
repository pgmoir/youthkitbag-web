import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  pagination: state.pagination,
});

const Pagination = ({ kitbagId, search, callback, pagination }) => {
  const { pagesize, order, direction, excgroups, exckitbags } = search;

  function changePage(moveToPage) {
    callback({
      ...search,
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
    return pagination.currentPage === 1;
  }

  function isPreviousPageDisabled() {
    return !pagination.hasPreviousPage;
  }

  function isNextPageDisabled() {
    return !pagination.hasNextPage;
  }

  function isLastPageDisabled() {
    return pagination.lastPage === pagination.currentPage;
  }

  return (
    <>
      {pagination && pagination.totalItems > pagination.itemsPerPage && (
        <nav
          className="pagination is-centered"
          role="navigation"
          aria-label="pagination"
        >
          <ul className="pagination-list">
            <li>
              <button
                className="pagination-link"
                aria-label="Goto page 1"
                disabled={isFirstPageDisabled()}
                onClick={() => changePage(1)}
              >
                First
              </button>
            </li>
            <li>
              <span className="pagination-ellipsis">&hellip;</span>
            </li>
            <li>
              <button
                className="pagination-previous"
                disabled={isPreviousPageDisabled()}
                onClick={() => changePage(pagination.previousPage)}
              >
                Previous
              </button>
            </li>
            <li>
              <button
                className="pagination-link is-current"
                aria-label={`Page ${pagination.currentPage}`}
                aria-current="page"
                onClick={() => changePage(pagination.currentPage)}
              >
                {pagination.currentPage}
              </button>
            </li>
            <li>
              <button
                className="pagination-next"
                disabled={isNextPageDisabled()}
                onClick={() => changePage(pagination.nextPage)}
              >
                Next page
              </button>
            </li>
            <li>
              <span className="pagination-ellipsis">&hellip;</span>
            </li>
            <li>
              <button
                className="pagination-link"
                aria-label={`Goto page ${pagination.lastPage}`}
                disabled={isLastPageDisabled()}
                onClick={() => changePage(pagination.lastPage)}
              >
                Last
              </button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default connect(mapStateToProps)(Pagination);
