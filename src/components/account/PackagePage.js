import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  userPackage: state.user.package
});

const PackagePage = ({ userPackage }) => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12">
          <p>
            As a user of YouthKitbag, you can add, create, trade and join
            different aspects of the YouthKitbag application, within the limits
            of your chosen package.
          </p>
          <p>
            If you are reaching or have reached the limits of your chosen
            package, you have the ability to upgrade to a very low cost paid
            package that will increase your limits and give you access to
            premium features.
          </p>
        </div>
      </div>
      {userPackage && (
        <div className="row">
          <div className="col-12">
            <h5>
              <i className={`fas fa-${userPackage.icon}`}></i> Package Usage and
              Limits
            </h5>
            <table className="table bg-light">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Current Usage</th>
                  <th scope="col">Current Limits</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Kit</td>
                  <td>{userPackage.size.kit}</td>
                  <td>{userPackage.max.kit}</td>
                </tr>
                <tr>
                  <td>Market</td>
                  <td>{userPackage.size.market}</td>
                  <td>{userPackage.max.market}</td>
                </tr>
                <tr>
                  <td>Photos</td>
                  <td>{userPackage.size.photos}</td>
                  <td>{userPackage.max.photos}</td>
                </tr>
                <tr>
                  <td>Groups</td>
                  <td>{userPackage.size.groups}</td>
                  <td>{userPackage.max.groups}</td>
                </tr>
                <tr>
                  <td>Group Admins</td>
                  <td>{userPackage.size.groupadmins}</td>
                  <td>{userPackage.max.groupadmins}</td>
                </tr>
                <tr>
                  <td>Accounts</td>
                  <td>{userPackage.size.accounts}</td>
                  <td>{userPackage.max.accounts}</td>
                </tr>
                <tr>
                  <td>Account Admins</td>
                  <td>{userPackage.size.accountadmins}</td>
                  <td>{userPackage.max.accountadmins}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className="row mb-3">
        <div className="col-12">
          <Link to="/package" className="btn btn-primary">
            Upgrade Package
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default connect(mapStateToProps)(PackagePage);
