import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});

const Header = ({ auth, user }) => {
  const { loggedIn } = auth;
  const account = user.profile.accounts
    ? user.profile.accounts.find(a => a.preferred)
    : undefined;
  const inGroup =
    user.profile.groups &&
    user.profile.groups.find(g => g.member.state === 'approved');

  return (
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
                {inGroup && (
                  <li className="nav-item">
                    <Link
                      className="btn btn-info text-nowrap mr-1"
                      to="/market/"
                      aria-label="Market place"
                    >
                      <span className="fas fa-th" aria-hidden="true"></span>{' '}
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
                      alt=""
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
  );
};

export default connect(mapStateToProps)(Header);
