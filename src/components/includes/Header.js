import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CookieConsent from 'react-cookie-consent';

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

const Header = ({ auth, user }) => {
  const { loggedIn } = auth;

  const kitbag = user.kitbags
    ? user.kitbags.find((a) => a.preferred)
    : undefined;

  const group = user.groups
    ? user.groups
        .filter((g) => g.state === 'approved')
        .find((a) => a.member.state === 'approved')
    : undefined;

  return (
    <>
      <header className="container is-fluid">
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              <strong>YouthKitbag</strong>
            </Link>
          </div>
          <div id="navbarBasic" className="navbar-menu">
            <div className="navbar-start"></div>
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  {loggedIn && (
                    <>
                      {group && (
                        <Link
                          className="button is-light"
                          to="/market?searchfor=&by=&page=1&pagesize=24"
                          aria-label="Market place"
                        >
                          Market
                        </Link>
                      )}
                      {kitbag && (
                        <Link
                          className="button is-light"
                          to={`/kitbag/kit/${kitbag._id}`}
                          aria-label={`${kitbag.name}`}
                        >
                          Kitbag
                        </Link>
                      )}
                      <Link className="button is-light" to="/settings/user">
                        Settings
                      </Link>
                      <Link className="button is-primary" to="/auth/logout">
                        <strong>Log out</strong>
                      </Link>
                    </>
                  )}
                  {!loggedIn && (
                    <>
                      <Link className="button is-primary" to="/auth/signup">
                        <strong>Sign up</strong>
                      </Link>
                      <Link className="button is-light" to="/auth/login">
                        Log in
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <CookieConsent
        cookieName="youthkitbagCookieConstent-1"
        buttonClasses="btn btn-warning mx-auto mx-sm-3 mb-3 my-sm-auto"
        disableButtonStyles={true}
      >
        <div className="py-4">
          This website requires cookies to handle key features such as logging
          in and authentication. It currently does not use any marketing or
          advertising cookies directly. Some third party tools do. If we
          introduce these we will advise you.
        </div>
      </CookieConsent>
    </>
  );
};

export default connect(mapStateToProps)(Header);
