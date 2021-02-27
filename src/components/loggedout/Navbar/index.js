import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
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
  NavMenu,
} from './NavbarElements';

const Navbar = ({ toggle, loggedIn, kitbag, group, profileImage }) => {
  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavLogo to="/">YouthKitbag</NavLogo>
          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>
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
                  <NavLinks to="kitbags">Kitbags</NavLinks>
                </NavItem>
                <NavItem>
                  <NavLinks to="groups">Groups</NavLinks>
                </NavItem>
                <NavItem>
                  <NavLinks to="trust">Trust</NavLinks>
                </NavItem>
                <NavItem>
                  <NavLinks to="market">Market</NavLinks>
                </NavItem>
                <NavItem>
                  <NavLinks to="signup">Sign Up</NavLinks>
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
