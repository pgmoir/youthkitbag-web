import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { hideFlag } from '../../actions/UserActions';

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

  if (welcomeAnnouncement)
    return (
      <article className="notification box">
        <h1 className="title is-3">Your YouthKitbag essentials!</h1>
      </article>
    );

  return (
    <article className="box">
      <h1 className="title is-1">Welcome to YouthKitbag!</h1>
      <div className="content">
        <p>
          Thank you for signing up to YouthKitbag, the simple and easy way to
          track and trade or recycle your child&apos;s sports, musical, activity
          or school gear.
        </p>
        <hr />
        <p>
          We will do our best on this dashboard to guide you through the key
          features to get the most out of YouthKitbag, but you may find it
          useful to watch this short video guide.
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
    </article>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomeAnnouncement);
