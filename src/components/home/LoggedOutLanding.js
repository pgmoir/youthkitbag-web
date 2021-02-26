import React, { useState } from 'react';
import Login from '../auth/LoginPage';
import HeroSection from '../loggedout/HeroSection';
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
      <div className="m-5">
        <Login />
      </div>
    </>
  );
};

export default LoggedOutLanding;
