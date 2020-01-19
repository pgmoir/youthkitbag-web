import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const GroupsPage = ({ profile }) => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12">
          <p>
            As a user of YouthKitbag, you can join as many accounts as allowed
            within your chosen package limits. The default coffee account (free)
            allows you to join 3 groups.
          </p>
          <p>
            Groups are clubs, sports teams, organisations within which you can
            trade kit items. Membership is granted by a group administrator.
          </p>
        </div>
      </div>
      {profile && profile.groups && profile.groups.length > 0 && (
        <div className="row">
          <div className="col-12">
            <h5>Group Membership</h5>
            <table className="table bg-light">
              <thead>
                <tr>
                  <th scope="col">Icon</th>
                  <th scope="col">Group</th>
                  <th scope="col">State</th>
                  <th scope="col">Permissions</th>
                </tr>
              </thead>
              <tbody>
                {profile.groups.map((item, index) => (
                  <tr key={`${item._id}-${index}`}>
                    <td className="valign-m">
                      <Link to={`/groups/${item._id}`}>
                        <img
                          src={
                            item.images && item.images.length > 0
                              ? item.images[0].imageUrl
                              : '/images/defaultthumb.png'
                          }
                          className="img-avatar img-thumbnail img-link rounded-circle p-0 m-1"
                          alt=""
                        />
                      </Link>
                    </td>
                    <td className="valign-m">
                      <Link to={`/groups/${item._id}`}>{item.name}</Link>
                    </td>
                    <td className="valign-m">{item.members[0].state}</td>
                    <td className="valign-m">
                      {item.members[0].permissions.join(', ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className="row mb-3">
        <div className="col-12">
          <Link to="/groups" className="btn btn-primary mr-3">
            Join Group
          </Link>
          <Link to="/groups/new" className="btn btn-outline-primary">
            Create Group
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
)(GroupsPage);
