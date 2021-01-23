import React from 'react';
import HelpNotification from './HelpNotification';

const UserHelp = () => {
  return (
    <HelpNotification nameOf="userHelp" title="Explanation of user">
      <p className="title is-5">Why should you complete your user?</p>
      <div className="content">
        <p>
          I know you&apos;ve already created an kitbag with your email address.
          But, it is always nicer to deal with people using real names, or at
          least a userName. A photo of yourself or something personal to you
          adds a bit of colour. And finally letting us know what activities you
          are interested in will help us filter the most interesting things for
          you within your groups.
        </p>
      </div>
    </HelpNotification>
  );
};

export default UserHelp;
