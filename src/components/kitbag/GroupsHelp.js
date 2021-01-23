import React from 'react';
import HelpNotification from './HelpNotification';

const GroupsHelp = () => {
  return (
    <HelpNotification nameOf="groupsHelp" title="Explanation of groups">
      <p className="title is-5">Why should you join or create a group?</p>
      <div className="content">
        <p>
          A group is where you trade, recycle, or search for available items.
          You can only do these activities within groups. Groups are YouthKitbag
          registered and approved clubs, teams and organisations. You can search
          for active groups to join. If you can&apos;t find the club to which
          you or your children belong then ask the club administrator to
          register, so that you and the other members can share and trade kit
          and equipment.
        </p>
        <p>
          If you are an administrator or manager for a club, team or
          organisation that involves children, then please create your group and
          it will be submitted automatically for YouthKitbag to review and
          approve.
        </p>
      </div>
    </HelpNotification>
  );
};

export default GroupsHelp;
