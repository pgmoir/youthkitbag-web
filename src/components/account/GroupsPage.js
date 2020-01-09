import React from 'react';
import { Link } from 'react-router-dom';

const GroupsPage = () => {
  return (
    <React.Fragment>
      <div className="row">
        <p>
          Displays groups that user is linked with, could be approved member,
          applied, rejected, or blocked
        </p>
      </div>
      <div className="row">
        <Link to="/groups" className="btn btn-primary">
          Search Groups
        </Link>
      </div>
    </React.Fragment>
  );
};

export default GroupsPage;
