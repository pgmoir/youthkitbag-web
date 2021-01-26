import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CookieConsent from 'react-cookie-consent';
import classNames from 'classnames';

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
      <header>
        <nav
          className="main-nav navbar is-primary"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              <strong>YouthKitbag</strong>
            </Link>
            <label class="navbar-burger burger" for="navbar-toggle-state">
              <span></span>
              <span></span>
              <span></span>
            </label>
            <input type="checkbox" id="navbar-toggle-state" />
            <div className="navbar-menu">
              <div className="navbar-end">
                {loggedIn && (
                  <>
                    {group && (
                      <div className="navbar-item">
                        <Link
                          className="button is-light"
                          to="/market?searchfor=&by=&page=1&pagesize=24"
                          aria-label="Market place"
                        >
                          <span className="icon">
                            <i class="fas fa-boxes"></i>
                          </span>
                          <span>Market</span>
                        </Link>
                      </div>
                    )}
                    {kitbag && (
                      <div className="navbar-item">
                        <Link
                          className="button is-light"
                          to={`/kitbag/kit/${kitbag._id}`}
                          aria-label={`${kitbag.name}`}
                        >
                          <span className="icon">
                            <i class="fas fa-briefcase"></i>
                          </span>
                          <span>Kitbag</span>
                        </Link>
                      </div>
                    )}
                    <div className="navbar-item">
                      <Link className="button is-light" to="/settings/user">
                        <span className="icon">
                          <i class="fas fa-user-cog"></i>
                        </span>
                        <span>Settings</span>
                      </Link>
                    </div>
                    <div className="navbar-item">
                      <Link
                        className="button is-primary is-outlined is-inverted"
                        to="/auth/logout"
                      >
                        <span className="icon">
                          <i class="fas fa-sign-out-alt"></i>
                        </span>
                        <span>Log out</span>
                      </Link>
                    </div>
                  </>
                )}
                {!loggedIn && (
                  <>
                    <div className="navbar-item">
                      <Link className="button is-primary" to="/auth/signup">
                        <span className="icon">
                          <i class="fas fa-sign-in-alt"></i>
                        </span>
                        <span>Sign up</span>
                      </Link>
                    </div>
                    <div className="navbar-item">
                      <Link className="button is-light" to="/auth/login">
                        <span className="icon">
                          <i class="fas fa-user-circle"></i>
                        </span>
                        <span>Log in</span>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
      <CookieConsent
        cookieName="youthkitbagCookieConstent-1"
        // buttonClasses="btn btn-warning mx-auto mx-sm-3 mb-3 my-sm-auto"
        // disableButtonStyles={true}
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
