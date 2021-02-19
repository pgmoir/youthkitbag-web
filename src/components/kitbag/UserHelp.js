import React from 'react';
import HelpNotification from './HelpNotification';

const UserHelp = () => {
  return (
    <HelpNotification nameOf="userHelp" title="Explanation of user">
      <p className="title is-5">Why should you complete your user?</p>
      <div className="content">
        <p>
          We know you&apos;ve already created a kitbag with your email address
          and names, but it would help if you complete your profile with a photo
          of yourself or something personal to you adds a bit of colour. And
          finally letting us know what activities you are interested in will
          help us filter the most interesting things for you within your groups.
        </p>
      </div>
    </HelpNotification>
  );
};

export default UserHelp;
