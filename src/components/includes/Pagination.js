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
          class="pagination is-centered"
          role="navigation"
          aria-label="pagination"
        >
          <ul class="pagination-list">
            <li>
              <a
                class="pagination-link"
                aria-label="Goto page 1"
                disabled={isFirstPageDisabled()}
                onClick={() => changePage(1)}
              >
                First
              </a>
            </li>
            <li>
              <span class="pagination-ellipsis">&hellip;</span>
            </li>
            <li>
              <a
                class="pagination-previous"
                disabled={isPreviousPageDisabled()}
                onClick={() => changePage(pagination.previousPage)}
              >
                Previous
              </a>
            </li>
            <li>
              <a
                class="pagination-link is-current"
                aria-label={`Page ${pagination.currentPage}`}
                aria-current="page"
                onClick={() => changePage(pagination.currentPage)}
              >
                {pagination.currentPage}
              </a>
            </li>
            <li>
              <a
                class="pagination-next"
                disabled={isNextPageDisabled()}
                onClick={() => changePage(pagination.nextPage)}
              >
                Next page
              </a>
            </li>
            <li>
              <span class="pagination-ellipsis">&hellip;</span>
            </li>
            <li>
              <a
                class="pagination-link"
                aria-label={`Goto page ${pagination.lastPage}`}
                disabled={isLastPageDisabled()}
                onClick={() => changePage(pagination.lastPage)}
              >
                Last
              </a>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default connect(mapStateToProps)(Pagination);
