import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { hideFlag } from '../../actions/UserActions';

const mapStateToProps = (state) => ({
  flags: state.user.flags,
});

const mapDispatchToProps = {
  hideFlag,
};

const KitbagsHelp = ({ flags, hideFlag }) => {
  const [KitbagsHelp, setKitbagsHelp] = useState(true);

  useEffect(() => {
    if (!flags) return setKitbagsHelp(true);

    var found = flags.find((e) => e.name === 'kitbagsHelp');
    setKitbagsHelp(!found ? false : found.hide);
  }, [flags, setKitbagsHelp]);

  function hideKitbagsHelp() {
    hideFlag('kitbagsHelp', true);
  }

  if (KitbagsHelp) return null;

  return (
    <div className="row">
      <div className="col-12">
        <div
          className="alert alert-warning alert-dismissible fade show d-flex flex-row align-items-center"
          role="alert"
        >
          <div className="pr-4">
            <span
              className="fas fa-question-circle fa-2x"
              title="Explanation of kitbags"
            ></span>
          </div>
          <div className="w-100">
            <div className="h4 alert-heading">
              Why should you create or join an kitbag?
            </div>
            <hr />
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={() => hideKitbagsHelp()}
            >
              <span aria-hidden="true">×</span>
            </button>
            <p>
              An kitbag allows you to create details of the kit (clothing,
              equipement, instruments, paraphenalia, etc.) that you own, that
              you either want to keep track of, or you might want to sell,
              trade, recycle, or even for items you want YouthKitbag to try and
              track down.
            </p>
            <p>
              You can share an kitbag with other family members so that you each
              can have you own separate login or club/team administrators (if
              you&apos;re trying to maintain a kitbag inventory for a club).
              After you create the kitbag, you will be able to invite others to
              join via an automated email.
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

export default connect(mapStateToProps, mapDispatchToProps)(KitbagsHelp);
