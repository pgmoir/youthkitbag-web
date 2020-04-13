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

  const account = user.profile.accounts
    ? user.profile.accounts.find((a) => a.preferred)
    : undefined;

  const group = user.profile.groups
    ? user.profile.groups
        .filter((g) => g.status === 'approved')
        .find((a) => a.member.state === 'approved')
    : undefined;

  return (
    <React.Fragment>
      <header>
        <Link
          id="header-acc-jump"
          className="sr-only sr-only-focusable"
          to="#main-acc-jump"
        >
          <div className="container">
            <span className="skiplink-text">Skip to content</span>
          </div>
        </Link>
        <nav
          className="navbar navbar-expand navbar-dark purple-gradient"
          aria-label="primary navigation"
        >
          <div className="container">
            <Link className="navbar-brand navbar-logo" to="/">
              YouthKitbag
            </Link>
            <ul className="navbar-nav navbar-expand ml-auto">
              {loggedIn && (
                <React.Fragment>
                  {group && (
                    <li className="nav-item">
                      <Link
                        className="btn btn-info text-nowrap mr-1"
                        to="/market?searchfor=&by=&page=1&pagesize=24"
                        aria-label="Market place"
                      >
                        <span
                          className="fas fa-th"
                          title="Market place"
                          aria-hidden="true"
                        ></span>{' '}
                      </Link>
                    </li>
                  )}
                  {account && (
                    <li className="nav-item">
                      <Link
                        className="btn btn-info text-nowrap mr-1"
                        to={`/kitbag/kit/${account._id}`}
                        aria-label={`${account.name}`}
                      >
                        <span
                          className="fas fa-shopping-bag"
                          title="Preferred kitbag"
                          aria-hidden="true"
                        ></span>{' '}
                      </Link>
                    </li>
                  )}
                  <li className="nav-item">
                    <Link className="nav-link d-inline" to="/settings/profile">
                      <img
                        src={
                          user.profile.images && user.profile.images.length > 0
                            ? user.profile.images[0].imageUrl
                            : '/images/defaultthumb.png'
                        }
                        className="img-avatar img-thumbnail img-link rounded-circle p-0 m-1"
                        alt="Link to profile page"
                      />
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="btn btn-danger text-nowrap"
                      to="/auth/logout"
                      aria-label="Logout from application"
                    >
                      <span
                        className="fas fa-sign-out-alt"
                        title="Logout"
                        aria-hidden="true"
                      ></span>{' '}
                    </Link>
                  </li>
                </React.Fragment>
              )}
              {!loggedIn && (
                <React.Fragment>
                  <li className="nav-item">
                    <Link
                      className="btn btn-info text-nowrap mr-3"
                      to="/why#created"
                      aria-label="Why did I create YouthKitbag"
                    >
                      <span
                        className="fas fa-question-circle"
                        title="Why was this website created?"
                        aria-hidden="true"
                      ></span>{' '}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="btn btn-success text-nowrap"
                      to="/auth/login"
                      aria-label="Login to use personalised features"
                    >
                      <span
                        className="fas fa-sign-in-alt"
                        title="Login"
                        aria-hidden="true"
                      ></span>{' '}
                    </Link>
                  </li>
                </React.Fragment>
              )}
            </ul>
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
    </React.Fragment>
  );
};

export default connect(mapStateToProps)(Header);
