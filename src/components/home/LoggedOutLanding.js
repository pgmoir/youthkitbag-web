import React, { useState } from 'react';
import Login from '../auth/LoginPage';
import HeroSection from '../loggedout/HeroSection';
import InfoSection from '../loggedout/InfoSection';
import {
  loggedOutObjOne,
  loggedOutObjThree,
  loggedOutObjTwo,
} from '../loggedout/InfoSection/Data';
import Navbar from '../loggedout/Navbar';
import Sidebar from '../loggedout/Sidebar';

const LoggedOutLanding = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeroSection />
      <InfoSection {...loggedOutObjOne} />
      <InfoSection {...loggedOutObjTwo} />
      <InfoSection {...loggedOutObjThree} />
      <div className="m-5">
        <Login />
      </div>
    </>
  );
};

export default LoggedOutLanding;
