import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { hideFlag } from '../../actions/UserActions';

const mapStateToProps = (state) => ({
  flags: state.user.flags,
});

const mapDispatchToProps = {
  hideFlag,
};

const BetaAnnouncement = ({ flags, hideFlag }) => {
  const [betaAnnouncement, setBetaAnnouncement] = useState(true);
  const [showMore, setShowMore] = useState(false);

  // useEffect(() => {
  //   if (!flags) return setBetaAnnouncement(false);

  //   var found = flags.find((e) => e.name === 'betaAnnouncement');
  //   setBetaAnnouncement(!found ? false : found.hide);
  // }, [flags, setBetaAnnouncement]);

  function hideBetaAnnouncement() {
    hideFlag('betaAnnouncement', true);
  }

  function toggleMore() {
    setShowMore(!showMore);
  }

  if (betaAnnouncement) return null;

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-12">
          <div
            className="alert alert-danger alert-dismissible fade show d-flex flex-row align-items-center"
            role="alert"
          >
            <div className="pr-4">
              <span
                className="fas fa-exclamation-circle fa-2x"
                title="Warning message"
              ></span>
            </div>
            <div className="w-100">
              <div className="h4 alert-heading">
                YouthKitbag is currently in Beta test phase
              </div>
              <hr />
              {flags && (
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-label="Close"
                  onClick={() => hideBetaAnnouncement()}
                >
                  <span aria-hidden="true">×</span>
                </button>
              )}
              <p>
                This software is currently in final stages of testing, and I
                have made this exclusively available to a limited set of groups.{' '}
                <button
                  className="btn btn-link a11y-highlight"
                  onClick={() => toggleMore()}
                >
                  {!showMore ? 'Show more' : 'Show less'}
                </button>
              </p>
              {showMore && (
                <>
                  <p>
                    Anyone registering and approved as a member of one of these
                    groups during this phase will be given free premium access
                    for ever.
                  </p>
                  <p>
                    PLEASE - If you find a problem with the website, or you
                    would like to request a feature, then please use the
                    UserReport feature in the bottom right corner of the screen.
                    Together we can make this the perfect tool for managing all
                    your kit.
                  </p>
                </>
              )}
              {flags && (
                <>
                  <hr />
                  <p className="mb-0">
                    <em>
                      Click on the cross in the top right to hide this advice
                      permanently.
                    </em>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BetaAnnouncement);
