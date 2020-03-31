import React from 'react';
import { connect } from 'react-redux';
import { resetFlags } from '../../actions/UserActions';

const mapStateToProps = state => ({
  flags: state.user.flags
});

const mapDispatchToProps = {
  resetFlags
};

const ConfigurationPage = ({ flags, resetFlags }) => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12">
          <p>
            This page lets you reset all the seen flags, as well as deleting
            your user and all associated items.
          </p>
        </div>
      </div>
      <h3>Flags</h3>
      <p>
        These are all the flags you have seen and dismissed. Resetting will
        flags will remove them all from your user account and the various alerts
        and announcements that can be dismissed will magically reappear.
      </p>
      <h4>Flags that have already been dismissed</h4>
      {flags && (
        <ul>
          {flags.map(f => {
            return <li key={f._id}>{f.name}</li>;
          })}
        </ul>
      )}
      <div className="row mb-3">
        <div className="col-12">
          <button className="btn btn-success" onClick={() => resetFlags()}>
            Reset Flags
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationPage);
