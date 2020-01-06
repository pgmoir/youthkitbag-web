import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    const { loggedIn } = this.props.auth;
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
            <Link className="navbar-brand mr-6 navbar-logo" to="/">
              YouthKitbag
            </Link>
            <ul className="navbar-nav navbar-expand ml-auto">
              {loggedIn && (
                <React.Fragment>
                  <li className="nav-item">
                    <Link
                      className="btn btn-info text-nowrap mr-3"
                      to="/market/5e12df4c9c92b60320f2bcff"
                      aria-label="Market place"
                    >
                      <span className="fas fa-th" aria-hidden="true"></span>{' '}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="btn btn-info text-nowrap mr-3"
                      to="/kitbag/kit/5e12df4c9c92b60320f2bcff"
                      aria-label="Your kitbag"
                    >
                      <span
                        className="fas fa-shopping-bag"
                        aria-hidden="true"
                      ></span>{' '}
                    </Link>
                  </li>
                  <li className="nav-item mr-3">
                    <Link className="nav-link d-inline" to="/settings">
                      <img
                        src={
                          this.props.user.profile.images &&
                          this.props.user.profile.images.length > 0
                            ? this.props.user.profile.images[0].imageUrl
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
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});

export default connect(mapStateToProps)(Header);
