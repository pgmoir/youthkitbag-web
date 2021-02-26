import React, { useState } from 'react';
import Navbar from './loggedout/Navbar';
import Sidebar from './loggedout/Sidebar';

const SiteNav = ({ auth }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} auth={auth} />
      <Navbar toggle={toggle} auth={auth} />
    </>
  );
};

export default SiteNav;
