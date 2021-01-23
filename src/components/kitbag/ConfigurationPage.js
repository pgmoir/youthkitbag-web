import React from 'react';
import { connect } from 'react-redux';
import { resetFlags } from '../../actions/UserActions';
import { Link } from 'react-router-dom';

const mapStateToProps = (state) => ({
  flags: state.user.flags,
});

const mapDispatchToProps = {
  resetFlags,
};

const ConfigurationPage = ({ userId, flags, resetFlags }) => {
  return (
    <>
      <div className="content">
        <p>
          This page lets you reset all the seen flags, as well as deleting your
          user and all associated items.
        </p>
        <hr />
        <p className="title is-6">Flags</p>
        <p>
          These are all the flags you have seen and dismissed. Resetting will
          flags will remove them all from your user kitbag and the various
          alerts and announcements that can be dismissed will magically
          reappear.
        </p>
        {(!flags || flags.length === 0) && (
          <p>You currently have no flags to reset.</p>
        )}
        {flags && flags.length > 0 && (
          <>
            <p className="title is-6">Flags that have already been dismissed</p>
            <ul>
              {flags.map((f) => {
                return <li key={f._id}>{f.name}</li>;
              })}
            </ul>
            <div className="buttons">
              <button
                className="button is-success"
                onClick={() => resetFlags()}
              >
                Reset Flags
              </button>
            </div>
          </>
        )}
        <hr />
        <p className="title is-6">Delete User</p>
        <p>
          If you no longer want to use YouthKitbag, we are incredibly sad.
          However, this is your choice, and as long as you have passed over
          administration of any kitbags or groups to another user, or if you
          were the sole owner/user of a kitbag, you will be able to delete your
          user and all associated data.
        </p>
        <div className="buttons">
          <Link
            to={`/settings/user/${userId}/delete`}
            className="button is-danger"
          >
            Delete User
          </Link>
        </div>
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationPage);
