import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { hideFlag } from '../../actions/UserActions';

const mapStateToProps = state => ({
  flags: state.user.flags
});

const mapDispatchToProps = {
  hideFlag
};

const GdprHelp = ({ flags, hideFlag }) => {
  const [GdprHelp, setGdprHelp] = useState(true);

  useEffect(() => {
    if (!flags) return setGdprHelp(true);

    var found = flags.find(e => e.name === 'gdprHelp');
    setGdprHelp(!found ? false : found.hide);
  }, [flags, setGdprHelp]);

  function hideGdprHelp() {
    hideFlag('gdprHelp', true);
  }

  if (GdprHelp) return null;

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-12">
          <div
            className="alert alert-danger alert-dismissible fade show d-flex flex-row align-items-center"
            role="alert"
          >
            <div className="pr-4">
              <span className="fas fa-exclamation-circle fa-2x"></span>
            </div>
            <div className="w-100">
              <div className="h4 alert-heading">
                What are cookies and why does this site need them?
              </div>
              <hr />
              <p>
                This site only works if you are logged in. To keep you logged in
                we require the use of cookies. We don&apos;t use cookies for any
                other purpose. If this changes, we will update this message and
                you will be required to agree to it again.
              </p>
              <p></p>
              <hr />
              <p></p>
              <p>
                <em>
                  Click on the cross in the top right to accept the use of
                  cookies on the site and to hide this advice permanently. If
                  you don&apos;t accept their use, we will be required to
                  prevent you from logging in.
                </em>
              </p>
              <button
                className="btn btn-success"
                onClick={() => hideGdprHelp()}
              >
                Accept cookies
              </button>
              <span className="mx-3">or</span>
              <button className="btn btn-danger" onClick={() => hideGdprHelp()}>
                Reject using cookies
              </button>{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GdprHelp);
