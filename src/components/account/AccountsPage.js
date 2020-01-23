import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PreferredAccountForm from './PreferredAccountForm';

const AccountsPage = ({ profile }) => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12">
          <p>
            As a user of YouthKitbag, you can create as many accounts as allowed
            within your chosen package limits. The default coffee account (free)
            allows you to create 3 accounts.
          </p>
          <p>
            You can then invite others to join your accounts via email. Those
            invited, will need to create an account, and then accept your
            invite. Once accepted, they will have access to view, update and
            switch to the market any items in the kitbag.
          </p>
        </div>
      </div>
      {profile && profile.accounts && profile.accounts.length > 0 && (
        <PreferredAccountForm
          userId={profile._id}
          accounts={profile.accounts}
        />
      )}
      <div className="row mb-3">
        <div className="col-12">
          <Link to="/accounts/new" className="btn btn-primary">
            Create Account
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  profile: state.user.profile
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AccountsPage);
