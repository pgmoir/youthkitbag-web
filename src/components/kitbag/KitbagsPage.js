import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PreferredKitbagForm from './PreferredKitbagForm';

const mapStateToProps = (state) => ({
  user: state.user,
});

const KitbagsPage = ({ user }) => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12">
          <p>
            As a user of YouthKitbag, you can create as many kitbags as allowed
            within your chosen bundle limits. The default Star kitbag (free)
            allows you to create 3 kitbags.
          </p>
          <Link to="/kitbags/new" className="btn btn-primary mb-3">
            Create Kitbag
          </Link>
          <p>
            You can then invite others to join your kitbags via email. Those
            invited, will need to create an kitbag, and then accept your invite.
            Once accepted, they will have access to view, update and switch to
            the market any items in the kitbag.
          </p>
          <p>
            If you are a member of multiple kitbags, you can only view one at a
            time. Therefore to switch between kitbags, select the preferred
            kitbag below and click on save to apply the change.
          </p>
        </div>
      </div>
      {user && user.kitbags && user.kitbags.length > 0 && (
        <PreferredKitbagForm userId={user._id} kitbags={user.kitbags} />
      )}
    </React.Fragment>
  );
};

export default connect(mapStateToProps)(KitbagsPage);
