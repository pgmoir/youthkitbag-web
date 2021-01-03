import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  userBundle: state.user.bundle,
});

const BundlePage = ({ userBundle }) => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12">
          <p>
            As a user of YouthKitbag, you can add, create, trade and join
            different aspects of the YouthKitbag application, within the limits
            of your chosen bundle.
          </p>
          <p>
            If you are reaching or have reached the limits of your chosen
            bundle, you have the ability to upgrade to a very low cost paid
            bundle that will increase your limits and give you access to premium
            features.
          </p>
        </div>
      </div>
      {userBundle && (
        <div className="row">
          <div className="col-12">
            <h5 className={`bg-${userBundle.theme} mb-0 p-3`}>
              <span
                className={`fas fa-${userBundle.icon} pr-2`}
                title={`${userBundle.icon} tier`}
              ></span>{' '}
              Bundle Usage and Limits
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
                  <td>{userBundle.size.kit}</td>
                  <td>{userBundle.max.kit}</td>
                </tr>
                <tr>
                  <td>Market</td>
                  <td>{userBundle.size.market}</td>
                  <td>{userBundle.max.market}</td>
                </tr>
                <tr>
                  <td>Photos</td>
                  <td>{userBundle.size.photos}</td>
                  <td>{userBundle.max.photos}</td>
                </tr>
                <tr>
                  <td>Groups</td>
                  <td>{userBundle.size.groups}</td>
                  <td>{userBundle.max.groups}</td>
                </tr>
                <tr>
                  <td>Group Admins</td>
                  <td>{userBundle.size.groupadmins}</td>
                  <td>{userBundle.max.groupadmins}</td>
                </tr>
                <tr>
                  <td>Kitbags</td>
                  <td>{userBundle.size.kitbags}</td>
                  <td>{userBundle.max.kitbags}</td>
                </tr>
                <tr>
                  <td>Kitbag Admins</td>
                  <td>{userBundle.size.kitbagadmins}</td>
                  <td>{userBundle.max.kitbagadmins}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className="row mb-3">
        <div className="col-12">
          <Link to="/bundles" className="btn btn-primary">
            Choose Bundle Upgrade
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default connect(mapStateToProps)(BundlePage);
