import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { hideFlag } from '../../actions/UserActions';

const mapStateToProps = state => ({
  flags: state.user.flags
});

const mapDispatchToProps = {
  hideFlag
};

const ProfileHelp = ({ flags, hideFlag }) => {
  const [ProfileHelp, setProfileHelp] = useState(true);

  useEffect(() => {
    if (!flags) return setProfileHelp(true);

    var found = flags.find(e => e.name === 'profileHelp');
    setProfileHelp(!found ? false : found.hide);
  }, [flags, setProfileHelp]);

  function hideProfileHelp() {
    hideFlag('profileHelp', true);
  }

  if (ProfileHelp) return null;

  return (
    <div className="row">
      <div className="col-12">
        <div
          className="alert alert-success alert-dismissible fade show d-flex flex-row align-items-center"
          role="alert"
        >
          <div className="pr-4">
            <span className="fas fa-question-circle fa-2x"></span>
          </div>
          <div className="w-100">
            <div className="h4 alert-heading">
              Why should you complete your profile?
            </div>
            <hr />
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={() => hideProfileHelp()}
            >
              <span aria-hidden="true">×</span>
            </button>
            <p>
              I know you&apos;ve already created an account with your email
              address. But, it is always nicer to deal with people using real
              names, or at least a username. A photo of yourself or something
              personal to you adds a bit of colour. And finally letting us know
              what activities you are interested in will help us filter the most
              interesting things for you within your groups.
            </p>
            <p></p>
            <hr />
            <p></p>
            <p className="mb-0">
              <em>
                Click on the cross in the top right to hide this advice
                permanently.
              </em>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHelp);
