import React from 'react';
import { Link } from 'react-router-dom';

const AccountAnnouncement = () => {
  function renderBlock() {
    return (
      <div className="card border-0">
        <div className="alert alert-success mb-0" role="alert">
          <h2 className="alert-heading">Get started</h2>
          <hr />
          <p>
            <strong>Welcome to YouthKitbag.</strong> To make the most of
            YouthKitbag you will need an account to keep track of all the kit
            you have and want to trade.
          </p>
          <Link className="btn btn-success" to="/accounts/new">
            Create an account
          </Link>
          <span className="ml-3">or</span>
          <button className="btn btn-link">Join an account</button>
        </div>
      </div>
    );
  }

  return <React.Fragment>{renderBlock()}</React.Fragment>;
};

export default AccountAnnouncement;
