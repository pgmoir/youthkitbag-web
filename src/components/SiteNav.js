import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Navbar from './loggedout/Navbar';
import Sidebar from './loggedout/Sidebar';
import { MemberStates } from '../enums/memberStates.enum';
import { getImage } from '../utils/image';
import { GroupStates } from '../enums/groupStates.enum';

const SiteNav = ({ auth }) => {
  const user = useSelector((state) => state.user);

  const [isOpen, setIsOpen] = useState(false);

  const { loggedIn } = auth;

  const kitbag = user.kitbags
    ? user.kitbags.find((a) => a.preferred)
    : undefined;

  const group = user.groups
    ? user.groups
        .filter((g) => g.state === GroupStates.ACTIVE)
        .find((a) => a.member.state === MemberStates.APPROVED)
    : undefined;

  const profileImage = getImage({
    images: user?.images,
    email: user?.email,
  });

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar
        isOpen={isOpen}
        toggle={toggle}
        loggedIn={loggedIn}
        kitbag={kitbag}
        group={group}
        profileImage={profileImage}
      />
      <Navbar
        toggle={toggle}
        loggedIn={loggedIn}
        kitbag={kitbag}
        group={group}
        profileImage={profileImage}
      />
    </>
  );
};

export default SiteNav;
