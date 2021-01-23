import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { hideFlag } from '../../actions/UserActions';

const mapDispatchToProps = {
  hideFlag,
};

const HelpNotification = ({ nameOf, hideFlag, title, children }) => {
  const flags = useSelector((state) => state.user.flags);
  const [helpDismissed, setHelpDismissed] = useState(true);

  useEffect(() => {
    if (!flags) return setHelpDismissed(true);

    var found = flags.find((e) => e.name === nameOf);
    setHelpDismissed(!found ? false : found.hide);
  }, [flags, setHelpDismissed]);

  function hideHelp() {
    hideFlag(nameOf, true);
  }

  if (helpDismissed) return null;

  return (
    <div className="notification is-info is-flex">
      <button class="delete" onClick={() => hideHelp()}></button>
      <div className="pr-4">
        <span className="fas fa-question-circle fa-2x" title={title}></span>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(HelpNotification);
