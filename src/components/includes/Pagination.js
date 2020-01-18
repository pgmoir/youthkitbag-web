import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const mapStateToProps = state => {
  return { pagination: state.pagination };
};

const Pagination = ({ pagination }) => {
  function getPaginationLink(page) {
    return `?page=${page}${pagination.filterUrl}`;
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
              <Link className="page-link" to={getPaginationLink(1)}>
                First
              </Link>
            </li>
            <li className={`page-item ${isPreviousPageDisabled()}`}>
              <Link
                className="page-link"
                to={getPaginationLink(pagination.previousPage)}
              >
                Previous
              </Link>
            </li>
            <li className="page-item active">
              <Link
                className="page-link"
                to={getPaginationLink(pagination.currentPage)}
              >
                {pagination.currentPage}
              </Link>
            </li>
            <li className={`page-item ${isNextPageDisabled()}`}>
              <Link
                className="page-link"
                to={getPaginationLink(pagination.nextPage)}
              >
                Next
              </Link>
            </li>
            <li className={`page-item ${isLastPageDisabled()}`}>
              <Link
                className="page-link"
                to={getPaginationLink(pagination.lastPage)}
              >
                Last
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </React.Fragment>
  );
};

export default connect(mapStateToProps)(Pagination);
