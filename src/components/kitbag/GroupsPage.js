import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  user: state.user,
});

const GroupsPage = ({ user }) => {
  return (
    <>
      <div className="content">
        <p>
          As a user of YouthKitbag, you can join as many kitbags as allowed
          within your chosen bundle limits. The default Star kitbag (free)
          allows you to join 3 groups.
        </p>
        <p>
          Groups are clubs, sports teams, organisations within which you can
          trade kit items. Membership is granted by a group administrator.
        </p>
      </div>
      {user && user.groups && user.groups.length > 0 && (
        <div className="row">
          <div className="col-12">
            <h5>Group Membership</h5>
            <table className="table bg-light">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Group</th>
                  <th scope="col">State</th>
                  <th scope="col">Roles</th>
                </tr>
              </thead>
              <tbody>
                {user.groups.map((item, index) => (
                  <tr key={`${item._id}-${index}`}>
                    <td className="valign-m mw-3rem">
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
                    <td className="valign-m">{item.member.state}</td>
                    <td className="valign-m">{item.member.roles.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className="buttons">
        <Link to="/groups" className="button is-primary">
          Join Group
        </Link>
        <Link to="/groups/new" className="button is-primary is-outlined">
          Create Group
        </Link>
      </div>
    </>
  );
};

export default connect(mapStateToProps)(GroupsPage);
