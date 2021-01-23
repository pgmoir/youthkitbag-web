import React from 'react';
import HelpNotification from './HelpNotification';

const KitbagsHelp = () => {
  return (
    <HelpNotification nameOf="kitbagsHelp" title="Explanation of kitbags">
      <p className="title is-5">Why should you create or join an kitbag?</p>
      <div classname="content">
        <p>
          An kitbag allows you to create details of the kit (clothing,
          equipement, instruments, paraphenalia, etc.) that you own, that you
          either want to keep track of, or you might want to sell, trade,
          recycle, or even for items you want YouthKitbag to try and track down.
        </p>
        <p>
          You can share an kitbag with other family members so that you each can
          have you own separate login or club/team administrators (if
          you&apos;re trying to maintain a kitbag inventory for a club). After
          you create the kitbag, you will be able to invite others to join via
          an automated email.
        </p>
      </div>
    </HelpNotification>
  );
};

export default KitbagsHelp;
