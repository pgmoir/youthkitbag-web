import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PreferredAccountForm from './PreferredAccountForm';

const mapStateToProps = state => ({
  profile: state.user.profile
});

const AccountsPage = ({ profile }) => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12">
          <p>
            As a user of YouthKitbag, you can create as many accounts as allowed
            within your chosen package limits. The default Star account (free)
            allows you to create 3 accounts.
          </p>
          <Link to="/accounts/new" className="btn btn-primary mb-3">
            Create Account
          </Link>
          <p>
            You can then invite others to join your accounts via email. Those
            invited, will need to create an account, and then accept your
            invite. Once accepted, they will have access to view, update and
            switch to the market any items in the kitbag.
          </p>
          <p>
            If you are a member of multiple accounts, you can only view one at a
            time. Therefore to switch between accounts, select the preferred
            account below and click on save to apply the change.
          </p>
        </div>
      </div>
      {profile && profile.accounts && profile.accounts.length > 0 && (
        <PreferredAccountForm
          userId={profile._id}
          accounts={profile.accounts}
        />
      )}
    </React.Fragment>
  );
};

export default connect(mapStateToProps)(AccountsPage);
