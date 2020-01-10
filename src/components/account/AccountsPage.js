import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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
        <div className="row">
          <div className="col-12">
            <h5>Account Membership</h5>
            <table className="table bg-light">
              <thead>
                <tr>
                  <th scope="col">Account</th>
                  <th scope="col">State</th>
                  <th scope="col">Permissions</th>
                  <th scope="col">Preferred</th>
                </tr>
              </thead>
              <tbody>
                {profile.accounts.map((item, index) => (
                  <tr key={`${item._id}-${index}`}>
                    <td>{item.name}</td>
                    <td>{item.members[0].state}</td>
                    <td>{item.members[0].permissions.join(', ')}</td>
                    <td>{item.preferred.toString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* <div className="row">
        <div className="col-12 mb-3 ">
          <div className="d-flex bg-light w-100">
            <div className="flex-col d-md-flex bg-light w-100">
              <div className="flex-grow-1 p-2 bg-light border-left border-right border-bottom">
                Moir family kitbag
              </div>
              <div className="flex-grow-1 p-2 bg-light border-left border-right border-bottom">
                approved
              </div>
              <div className="flex-grow-1 p-2 bg-light border-left border-right border-bottom">
                member, admin
              </div>
            </div>
            <div className="d-flex bg-light">
              <div className="p-2 bg-light border-left border-bottom">
                preferred
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="row mb-3">
        <div className="col-12">
          <Link to="/accounts/add" className="btn btn-primary">
            Add Account
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountsPage);
