import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { hideFlag } from '../../actions/UserActions';
import Title from '../includes/title/Title';

const mapStateToProps = (state) => ({
  flags: state.user.flags,
});

const mapDispatchToProps = {
  hideFlag,
};

const WelcomeAnnouncement = ({ flags, hideFlag }) => {
  const [welcomeAnnouncement, setWelcomeAnnouncement] = useState(true);

  useEffect(() => {
    if (!flags) return setWelcomeAnnouncement(true);

    var found = flags.find((e) => e.name === 'welcomeAnnouncement');
    setWelcomeAnnouncement(!found ? false : found.hide);
  }, [flags, setWelcomeAnnouncement]);

  function hideWelcomeAnnouncement() {
    hideFlag('welcomeAnnouncement', true);
  }

  if (welcomeAnnouncement) return <Title title="Your Kitbag essentials" />;

  return (
    <div className="box is-primary">
      <h1 className="title is-1">Welcome to YouthKitbag!</h1>
      <div className="content">
        <p>
          Thank you for signing up to YouthKitbag, the simple and easy way to
          log, find and trade or recycle your child&apos;s sports, musical,
          activity or school gear after they grow out of it.
        </p>
        <hr></hr>
        <p>
          We will do our best to guide you on this page to the things you need
          to do to get the most out of YouthKitbag, but you may find it useful
          to watch this short video guide.
        </p>
      </div>
      <div className="buttons">
        <Link to="/learn/intro" className="button is-primary">
          Watch our guide to YouthKitbag
        </Link>
        <button
          className="button is-primary is-outlined"
          onClick={() => hideWelcomeAnnouncement()}
        >
          Hide this message
        </button>
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomeAnnouncement);
