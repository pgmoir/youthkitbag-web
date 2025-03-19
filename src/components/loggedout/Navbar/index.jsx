import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { animateScroll as scroll } from 'react-scroll';
import {
  MobileIcon,
  Nav,
  NavbarContainer,
  NavBtn,
  NavBtnLink,
  NavItem,
  NavLink,
  NavLinks,
  NavLogo,
  NavMenu
} from './NavbarElements';

const Navbar = ({ toggle, loggedIn, kitbag, group, profileImage }) => {
  let location = useLocation();
  const showIcon = !location.pathname.startsWith('/auth/');

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavLogo to="/" onClick={toggleHome}>
            YouthKitbag
          </NavLogo>
          {showIcon && (
            <MobileIcon onClick={toggle}>
              <FaBars />
            </MobileIcon>
          )}
          <NavMenu>
            {loggedIn ? (
              <>
                {kitbag && (
                  <NavItem>
                    <NavLink to={`/kitbag/kit/${kitbag._id}`}>Kitbag</NavLink>
                  </NavItem>
                )}
                <NavItem>
                  <NavLink to="/groups">Groups</NavLink>
                </NavItem>
                {group && (
                  <NavItem>
                    <NavLink to="/market">Market</NavLink>
                  </NavItem>
                )}
                <NavBtn>
                  <Link className="" to="/settings/user">
                    <div className="image mx-5">
                      <img
                        src={profileImage}
                        className="is-avatar is-rounded is-48x48"
                        alt=""
                      />
                    </div>
                  </Link>
                </NavBtn>
              </>
            ) : (
              <>
                <NavItem>
                  <NavLinks
                    to="kitbags"
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact="true"
                    offset={-80}
                  >
                    Kitbags
                  </NavLinks>
                </NavItem>
                <NavItem>
                  <NavLinks
                    to="groups"
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact="true"
                    offset={-80}
                  >
                    Groups
                  </NavLinks>
                </NavItem>
                <NavItem>
                  <NavLinks
                    to="trust"
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact="true"
                    offset={-80}
                  >
                    Trust
                  </NavLinks>
                </NavItem>
                <NavItem>
                  <NavLinks
                    to="market"
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact="true"
                    offset={-80}
                  >
                    Market
                  </NavLinks>
                </NavItem>
                <NavItem>
                  <NavLinks
                    to="signup"
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact="true"
                    offset={-80}
                  >
                    Sign Up
                  </NavLinks>
                </NavItem>
              </>
            )}
          </NavMenu>
          <NavBtn>
            {loggedIn ? (
              <NavBtnLink to="/auth/logout">Log Out</NavBtnLink>
            ) : (
              <NavBtnLink to="/auth/login">Log In</NavBtnLink>
            )}
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;
