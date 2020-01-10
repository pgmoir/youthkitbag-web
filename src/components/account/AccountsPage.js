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
            <table className="table bg-light">
              <caption>Account membership</caption>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">State</th>
                  <th scope="col">Permissions</th>
                  <th scope="col">Id</th>
                  <th scope="col">Preferred</th>
                </tr>
              </thead>
              <tbody>
                {profile.accounts.map((item, index) => (
                  <tr key={`${item._id}-${index}`}>
                    <th scope="row">{index}</th>
                    <td>{item.name}</td>
                    <td>{item.members[0].state}</td>
                    <td>{item.members[0].permissions.join(', ')}</td>
                    <td>{item._id}</td>
                    <td>{item.preferred.toString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className="row">
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
