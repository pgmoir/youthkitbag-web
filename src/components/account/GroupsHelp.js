import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { hideFlag } from '../../actions/UserActions';

const mapStateToProps = state => ({
  flags: state.user.flags
});

const mapDispatchToProps = {
  hideFlag
};

const GroupsHelp = ({ flags, hideFlag }) => {
  const [GroupsHelp, setGroupsHelp] = useState(true);

  useEffect(() => {
    if (!flags) return setGroupsHelp(true);

    var found = flags.find(e => e.name === 'groupsHelp');
    setGroupsHelp(!found ? false : found.hide);
  }, [flags, setGroupsHelp]);

  function hideGroupsHelp() {
    hideFlag('groupsHelp', true);
  }

  if (GroupsHelp) return null;

  return (
    <div className="row">
      <div className="col-12">
        <div
          className="alert alert-warning alert-dismissible fade show d-flex flex-row align-items-center"
          role="alert"
        >
          <div className="pr-4">
            <span className="fas fa-question-circle fa-2x"></span>
          </div>
          <div className="w-100">
            <div className="h4 alert-heading">
              Why should you join or create a group?
            </div>
            <hr />
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={() => hideGroupsHelp()}
            >
              <span aria-hidden="true">×</span>
            </button>
            <p>
              A group is where you trade, recycle, or search for available
              items. You can only do these activities within groups. Groups are
              YouthKitbag registered and approved clubs, teams and
              organisations. You can search for active groups to join. If you
              can&apos;t find the club to which you or your children belong then
              ask the club administrator to register, so that you and the other
              members can share and trade kit and equipment.
            </p>
            <p>
              If you are an administrator or manager for a club, team or
              organisation that involves children, then please create your group
              and it will be submitted automatically for YouthKitbag to review
              and approve.
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

export default connect(mapStateToProps, mapDispatchToProps)(GroupsHelp);
