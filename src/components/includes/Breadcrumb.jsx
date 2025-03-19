import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ crumbs }) => {
  return (
    <nav className="breadcrumb" aria-label="breadcrumbs">
      <ul>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          if (isLast) {
            return (
              <li key={index} className="is-active">
                <Link to="#">{crumb.title}</Link>
              </li>
            );
          }
          return (
            <li key={index}>
              <Link to={crumb.to}>{crumb.title}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
