import React, { useState } from 'react';
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
    </>
  );
};

export default LoggedOutLanding;
