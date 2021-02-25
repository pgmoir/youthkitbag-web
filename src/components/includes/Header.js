import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CookieConsent from 'react-cookie-consent';
import { GroupStates } from '../../enums/groupStates.enum';
import { MemberStates } from '../../enums/memberStates.enum';
import { getImage } from '../../utils/image';

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
        .filter((g) => g.state === GroupStates.ACTIVE)
        .find((a) => a.member.state === MemberStates.APPROVED)
    : undefined;

  const profileImage = getImage({
    images: user?.images,
    email: user?.email,
  });

  return (
    <>
      <header>
        <nav
          className="main-nav navbar is-primary"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand is-flex-grow-1">
            <Link className="navbar-item is-size-4" to="/">
              YouthKitbag
            </Link>

            <div className="is-flex is-flex-grow-1 is-justify-content-flex-end is-align-items-center">
              {loggedIn ? (
                <>
                  {group && (
                    <div>
                      <Link
                        className="button is-light px-3 mr-3"
                        to="/market"
                        aria-label="Market place"
                      >
                        <i className="fas fa-boxes"></i>
                        <span className="is-hidden-touch ml-3 has-text-weight-bold">
                          Market
                        </span>
                      </Link>
                    </div>
                  )}
                  {kitbag && (
                    <div>
                      <Link
                        className="button is-light px-3 mr-3"
                        to={`/kitbag/kit/${kitbag._id}`}
                        aria-label={`${kitbag.name}`}
                      >
                        <i className="fas fa-briefcase"></i>
                        <span className="is-hidden-touch ml-3 has-text-weight-bold">
                          Kitbag
                        </span>
                      </Link>
                    </div>
                  )}
                  <div>
                    <Link className="" to="/settings/user">
                      <div className="image mr-3">
                        <img
                          src={profileImage}
                          className="is-avatar is-rounded is-32x32"
                          alt=""
                        />
                      </div>
                    </Link>
                  </div>
                  <div>
                    <Link
                      className="button is-primary is-outlined is-inverted px-3 mr-3"
                      to="/auth/logout"
                    >
                      <i className="fas fa-sign-out-alt"></i>
                      <span className="is-hidden-touch ml-3 has-text-weight-bold">
                        Log out
                      </span>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Link
                      className="button is-primary px-3 mr-3"
                      to="/auth/signup"
                      aria-label="Sign up"
                    >
                      <i className="fas fa-sign-in-alt"></i>
                      <span className="is-hidden-touch ml-3 has-text-weight-bold">
                        Sign up
                      </span>
                    </Link>
                  </div>
                  <div>
                    <Link
                      className="button is-light px-3 mr-3"
                      to="/auth/login"
                      aria-label="Log in"
                    >
                      <i className="fas fa-user-circle"></i>
                      <span className="is-hidden-touch ml-3 has-text-weight-bold">
                        Log in
                      </span>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
      <CookieConsent
        cookieName="youthkitbagCookieConstent-1"
        buttonClasses="button is-warning m-5"
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
