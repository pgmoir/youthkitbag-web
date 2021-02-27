import React from 'react';
import {
  CloseIcon,
  Icon,
  SidebarContainer,
  SidebarLink,
  SidebarRouteLink,
  SidebarMenu,
  SidebarRoute,
  SidebarWrapper,
  SideBtnWrap,
} from './SidebarElements';

const Sidebar = ({ isOpen, toggle, loggedIn, kitbag, group }) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          {loggedIn ? (
            <>
              {kitbag && (
                <SidebarRouteLink to={`/kitbag/kit/${kitbag._id}`}>
                  Kitbag
                </SidebarRouteLink>
              )}
              <SidebarRouteLink to="/groups">Groups</SidebarRouteLink>
              {group && (
                <SidebarRouteLink to="/market">Market</SidebarRouteLink>
              )}
              <SidebarRouteLink to="/settings/user">Settings</SidebarRouteLink>
            </>
          ) : (
            <>
              <SidebarLink to="kitbags">Kitbags</SidebarLink>
              <SidebarLink to="groups">Groups</SidebarLink>
              <SidebarLink to="market">Market</SidebarLink>
              <SidebarLink to="signup">Sign Up</SidebarLink>
            </>
          )}
        </SidebarMenu>
        <SideBtnWrap>
          {loggedIn ? (
            <SidebarRoute to="/auth/logout">Log Out</SidebarRoute>
          ) : (
            <SidebarRoute to="/auth/login">Log In</SidebarRoute>
          )}
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
