import React from 'react';
import { Link } from 'react-router-dom';

const AccountsPage = () => {
  return (
    <React.Fragment>
      <div className="row">
        <p>
          Displays accounts that user is linked with, could be approved member,
          invited
        </p>
      </div>
      <div className="row">
        <Link to="/accounts/add" className="btn btn-primary">
          Add Account
        </Link>
      </div>
    </React.Fragment>
  );
};

export default AccountsPage;
