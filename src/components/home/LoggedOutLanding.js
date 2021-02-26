import React from 'react';
import Groups from '../loggedout/Groups';
import HeroSection from '../loggedout/HeroSection';
import InfoSection from '../loggedout/InfoSection';
import {
  loggedOutObjOne,
  loggedOutObjThree,
  loggedOutObjTwo,
} from '../loggedout/InfoSection/Data';
import SignUpSection from '../loggedout/SignUp';

const LoggedOutLanding = () => {
  return (
    <>
      <HeroSection />
      <InfoSection {...loggedOutObjOne} />
      <InfoSection {...loggedOutObjTwo} />
      <Groups />
      <InfoSection {...loggedOutObjThree} />
      <SignUpSection />
    </>
  );
};

export default LoggedOutLanding;
