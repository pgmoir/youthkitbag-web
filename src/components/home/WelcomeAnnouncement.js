import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { hideFlag } from '../../actions/UserActions';

const mapStateToProps = state => ({
  flags: state.user.flags
});

const mapDispatchToProps = {
  hideFlag
};

const WelcomeAnnouncement = ({ userId, flags, hideFlag }) => {
  const [welcomeAnnouncement, setWelcomeAnnouncement] = useState(false);

  useEffect(() => {
    if (!flags) return setWelcomeAnnouncement(false);

    var found = flags.find(e => e.name === 'welcomeAnnouncement');
    setWelcomeAnnouncement(!found ? false : found.hide);
  }, [flags, setWelcomeAnnouncement]);

  function hideWelcomeAnnouncement() {
    hideFlag(userId, 'welcomeAnnouncement', true);
  }

  function renderBlock() {
    console.log('WA', welcomeAnnouncement);
    if (welcomeAnnouncement) return null;

    return (
      <div className="jumbotron">
        <h1 className="display-4">Welcome to YouthKitbag!</h1>
        <p className="lead">
          Thank you for signing up to YouthKitbag, the simple and easy way to
          log, find and trade or recycle your child&apos;s sports, musical,
          activity or school gear after they grow out of it.
        </p>
        <hr className="my-4"></hr>
        <p>
          We will do our best to guide you on this page to the things you need
          to do to get the most out of YouthKitbag, but you may find it useful
          to watch this short video guide.
        </p>
        <Link to="/learn/intro" className="btn btn-primary btn-lg">
          Watch our guide to YouthKitbag
        </Link>
        <span className="ml-3">or</span>
        <button
          className="btn btn-link"
          onClick={() => hideWelcomeAnnouncement()}
        >
          Hide this message
        </button>
      </div>
    );
  }

  return <React.Fragment>{renderBlock()}</React.Fragment>;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomeAnnouncement);
