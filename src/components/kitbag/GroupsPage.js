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
        <>
          <h5>Group Membership</h5>{' '}
          <table className="table bg-light is-fullwidth">
            <thead>
              <tr>
                <th className="is-4"></th>
                <th>Group</th>
                <th className="is-hidden-mobile">State</th>
                <th className="is-hidden-mobile">Roles</th>
              </tr>
            </thead>
            <tbody>
              {user.groups.map((item, index) => (
                <tr key={index}>
                  <td>
                    <Link to={`/groups/${item._id}`}>
                      <figure className="image is-1by1">
                        <img
                          src={
                            item.images && item.images.length > 0
                              ? item.images[0].imageUrl
                              : '/images/defaultthumb.png'
                          }
                          className="is-rounded"
                          alt=""
                        />
                      </figure>
                    </Link>
                  </td>
                  <td className="is-vcentered">
                    <Link to={`/groups/${item._id}`}>{item.name}</Link>
                  </td>
                  <td className="is-hidden-mobile is-vcentered">
                    {item.member.state}
                  </td>
                  <td className="is-hidden-mobile is-vcentered">
                    {item.member.roles.join(', ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      <div className="buttons">
        <Link to="/groups" className="button is-primary">
          Join Group
        </Link>
        <Link to="/groups/new" className="button is-info">
          Create Group
        </Link>
      </div>
    </>
  );
};

export default connect(mapStateToProps)(GroupsPage);
