import React from 'react';
import { useSelector } from 'react-redux';
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
import { GroupStates } from '../../../enums/groupStates.enum';
import { MemberStates } from '../../../enums/memberStates.enum';
import { getImage } from '../../../utils/image';

const Navbar = ({ toggle, auth }) => {
  const user = useSelector((state) => state.user);

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
                    <NavLink to={`/kitbag/kit/${kitbag._id}`}>Kitbags</NavLink>
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
            {auth.loggedIn ? (
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
