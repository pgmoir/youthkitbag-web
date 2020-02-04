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
            To make the most of YouthKitbag you will need an account to keep
            track of all the kit you have and want to trade. You can either set
            one up for just yourself, or for your family, or there may be one
            you&apos;d like to join.
          </p>
          <Link className="btn btn-success" to="/accounts/new">
            Create an account
          </Link>
          <span className="ml-3">or</span>
          <Link className="btn btn-link" to="/accounts/join">
            Join an account
          </Link>
        </div>
      </div>
    );
  }

  return <React.Fragment>{renderBlock()}</React.Fragment>;
};

export default AccountAnnouncement;
